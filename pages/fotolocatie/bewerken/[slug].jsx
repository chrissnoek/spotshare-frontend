import React, { useState, useEffect } from "react";
import graphQLFetch from "../../../graphQLFetch.js";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import slugify from "slugify";
import Head from "next/head";
import { userContext } from "../../../services/userContext.js";
import Link from "next/link";
import { RiLoader4Line } from "react-icons/ri"
import { FaSpinner } from "react-icons/fa";

const animatedComponents = makeAnimated();


const EditLocationWrapper = () => {

	return <userContext.Consumer>
		{(value) => {
			console.log(value);
			if (value.user) {
				return (
					<EditLocation
						value={value}
					/>
				);
			} else {
				return (
					<div className="w-screen h-screen flex items-center justify-center">
						<div className="p-4 rounded border border-blue-400 bg-blue-100 text-blue-500  mt-2 text-center">
							<div className="font-bold mb-2">
								Alvast bedankt voor je bijdrage!
							</div>
							<Link href="/inloggen">
								<a className="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-600">
									Log eerst even in!
								</a>
							</Link>
						</div>
					</div>
				)
			}
		}}
	</userContext.Consumer>
}

const EditLocation = () => {
	const router = useRouter();
	const [location, setLocation] = useState();
	const [locationCategoryValues, setLocationCategoryValues] = useState();
	const [monthValues, setMonthValues] = useState();
	const [selectedLocationCategories, setSelectedLocationCategories] = useState(
		[]
	);
	const [creatableValues, setCreatableValues] = useState([]);
	const [selectedMonths, setSelectedMonths] = useState([]);
	const [values, setValues] = useState({
		title: "",
		desc: "",
		directions: "",
		whattoshoot: "",
	});
	const [loading, setLoading] = useState(false);

	const fetchData = async () => {
		let result;
		const { slug } = router.query;

		const query = `query locationBySlug($slug: String!){
              locationBySlug(slug: $slug) {
                  title
                  desc
                  slug
                  id
                  longitude
                  latitude
                  directions
                  whattoshoot
                  location_categories {
                    label
                    value
                    id
                  }
                  months {
                    label
                    value
                    id
                  }
              }
          }`;

		if (slug) {
			result = await graphQLFetch(query, { slug }, true);
		}

		if (result && result.locationBySlug) {
			setLocation(result.locationBySlug);

			const catIds = result.locationBySlug.location_categories.map(
				(category) => category.id
			);
			const monIds = result.locationBySlug.months.map((month) => month.id);

			setSelectedLocationCategories(catIds);
			setSelectedMonths(monIds);
		}

		//console.log(data);
	};

	useEffect(() => {
		fetchData();
		fetchCategories();
	}, [router.query]);

	useEffect(() => {
		if (location) {
			setCreatableValues(location.location_categories);
			setValues({
				title: location.title,
				desc: location.desc,
				whattoshoot: location.whattoshoot,
				directions: location.directions,
			});
		}
	}, [location]);

	const onInputChange = (e) => {
		const _values = { ...values };
		_values[e.target.name] = e.target.value;
		setValues(_values);
	};

	const fetchCategories = async () => {
		// build the graphql query
		const query = `query locationCategories{
            locationCategories {
              label
              value
              id
            }
            months {
              label
              value
              id
            }
          }`;
		const result = await graphQLFetch(query, {}, true);

		setLocationCategoryValues(result.locationCategories);
		setMonthValues(result.months);
	};

	const handleSelect = (newValues, name) => {
		/*
			set the ID of the location_categories to location object
			and update the selected values in object location_categories in the state
			*/
		let ids;
		if (newValues !== null) {
			ids = newValues.map((item) => {
				return item.id;
			});
		} else {
			ids = [];
		}

		if (name === "locationCategories") {
			setSelectedLocationCategories(ids);
			setCreatableValues(newValues);
		} else {
			setSelectedMonths(ids);
		}
	};

	const onCategoryCreate = async (option) => {
		const label = option;

		const value = slugify(option, {
			replacement: "-", // replace spaces with replacement character, defaults to `-`
			remove: undefined, // remove characters that match regex, defaults to `undefined`
			lower: true, // convert to lower case, defaults to `false`
			strict: true, // strip special characters except replacement, defaults to `false`
		});

		const query = `mutation CreateLocationCategory($input: createLocationCategoryInput) {
            createLocationCategory(input: $input){
            locationCategory{
              label
              value
              id
            }
          }
          }`;

		let input = {};
		input["data"] = {
			label: label,
			value: value,
		};

		const data = await graphQLFetch(query, { input }, true);

		if (data) {
			const { label, value, id } = data.createLocationCategory.locationCategory;

			const newCategory = {
				label: label,
				value: value,
				id: id,
			};

			const oldCategories = [...locationCategoryValues];
			oldCategories.push(newCategory);
			setLocationCategoryValues(oldCategories);

			const oldIds = [...selectedLocationCategories];
			oldIds.push(id);
			setSelectedLocationCategories(oldIds);

			const oldCreatableValues = [...creatableValues];
			oldCreatableValues.push(newCategory);
			setCreatableValues(oldCreatableValues);

			return {
				label: label,
				value: value,
				id: id,
			};
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const oldLocation = { ...location };
		oldLocation.location_categories = selectedLocationCategories;
		oldLocation.months = selectedMonths;

		oldLocation.title = values.title;
		oldLocation.desc = values.desc;
		oldLocation.directions = values.directions;
		oldLocation.whattoshoot = values.whattoshoot;

		// console.log(oldLocation);

		const query = `mutation updateLocation($input: updateLocationInput) {
              updateLocation(input: $input){
              location{
                slug
                id
              }
            }
            }`;

		let input = {};
		input["where"] = { id: oldLocation.id };
		input["data"] = oldLocation;

		delete input.data.id;

		// console.log(input);
		const data = await graphQLFetch(query, { input }, true);

		if (data) {
			// console.log(data);
			const { slug } = data.updateLocation.location;
			router.push(`/fotolocatie/${slug}`);
		} else {
			alert('er is iets mis gegaan, probeer het opnieuw!');
			setLoading(false);
		}

	};

	return !location ? (
		<div className="w-screen h-screen flex items-center justify-center">
			<RiLoader4Line className="spin text-3xl text-gray-500" />
		</div>
	) : (
		<div>
			<form
				name="updateLocation"
				encType="multipart/form-data"
				onSubmit={handleSubmit}
				className="photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6 z-1"
			>
				<Head>
					<meta name="robots" content="noindex,nofollow,noarchive" key="robots" />
				</Head>
				<h1 className="my-2 font-bold">
					Fotolocatie {location.title} aanvullen
				</h1>
				<input
					value={values.title || ""}
					onChange={onInputChange}
					name="title"
				/>
				<textarea
					value={values.desc || ""}
					onChange={onInputChange}
					name="desc"
				></textarea>

				<textarea
					type="text"
					name="directions"
					value={values.directions || ""}
					onChange={onInputChange}
					placeholder="Beste manier om hier naar toe te reizen? Is bijvoorbeeld er een parkeerplaats dichtbij, stopt er een bus?"
				/>
				<textarea
					type="text"
					name="whattoshoot"
					value={values.whattoshoot || ""}
					onChange={onInputChange}
					placeholder="Tips en advies, wat kan je fotograferen op deze locatie?"
				/>
				<div className="relative z-1 mb-2">
					<CreatableSelect
						components={animatedComponents}
						isMulti
						onChange={(e) => {
							handleSelect(e, "locationCategories");
						}}
						options={locationCategoryValues}
						placeholder="Categorieën"
						value={creatableValues}
						onCreateOption={onCategoryCreate}
						formatCreateLabel={(label) => `Maak nieuwe categorie: "${label}`}
					/>
				</div>
				<div className="relative z-1">
					<Select
						components={animatedComponents}
						closeMenuOnSelect={false}
						isMulti
						defaultValue={location.months}
						options={monthValues}
						placeholder="Beste maand om te fotograferen"
						onChange={(e) => {
							handleSelect(e, "months");
						}}
					/>
				</div>

				<button
					type="submit"
					className={"block px-4 py-2 my-2 text-white rounded text-l ml-auto " +
						(loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600')}
					disabled={loading}
				>
					{loading ? <FaSpinner className="animate-spin" /> : 'Opslaan'}
				</button>
			</form>
		</div>
	);
};

export default EditLocationWrapper;
