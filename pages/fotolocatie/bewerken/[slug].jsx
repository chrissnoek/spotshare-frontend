import React, { useState, useEffect } from "react";
import graphQLFetch from "../../../graphQLFetch.js";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import slugify from "slugify";

const animatedComponents = makeAnimated();

const EditLocation = () => {
  const router = useRouter();
  const [location, setLocation] = useState();
  const [locationCategoryValues, setLocationCategoryValues] = useState();
  const [monthValues, setMonthValues] = useState();
  const [selectedLocationCategories, setSelectedLocationCategories] = useState(
    []
  );
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [values, setValues] = useState({
    title: "",
    desc: "",
    directions: "",
    whattoshoot: "",
  });

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
    console.log("locatin updated", location);
    if (location) {
      setValues({
        title: location.title,
        desc: location.desc,
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

  const handleSelect = (newValue, name) => {
    /*
        set the ID of the location_categories to location object
        and update the selected values in object location_categories in the state
        */
    let ids;
    if (newValue !== null) {
      ids = newValue.map((item) => {
        return item.id;
      });
    } else {
      ids = [];
    }

    if (name === "locationCategories") {
      setSelectedLocationCategories(ids);
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

      return {
        label: label,
        value: value,
        id: id,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const oldLocation = { ...location };
    oldLocation.location_categories = selectedLocationCategories;
    oldLocation.months = selectedMonths;

    oldLocation.title = values.title;
    oldLocation.desc = values.desc;
    oldLocation.directions = values.directions;
    oldLocation.whattoshoot = values.whattoshoot;

    console.log(oldLocation);

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

    console.log(input);
    const data = await graphQLFetch(query, { input }, true);

    if (data) {
      console.log(data);
      const { slug } = data.updateLocation.location;
      router.push(`/fotolocatie/${slug}`);
    }

    // get all data for grahqpl
    // create mutation query
    // do grahqplfetch
    // if data, redirect to updated location
  };

  return !location ? (
    <div>loading</div>
  ) : (
    <div>
      <form
        name="updateLocation"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6 z-1"
      >
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
          onChange={onInputChange}
          placeholder="Beste manier om hier naar toe te reizen? Is bijvoorbeeld er een parkeerplaats dichtbij, stopt er een bus?"
        />
        <textarea
          type="text"
          name="whattoshoot"
          onChange={onInputChange}
          placeholder="Tips en advies, wat kan je fotograferen op deze locatie?"
        />
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
        <div className="relative z-1">
          <CreatableSelect
            components={animatedComponents}
            isMulti
            onChange={(e) => {
              handleSelect(e, "locationCategories");
            }}
            options={locationCategoryValues}
            placeholder="Categorieën"
            defaultValue={location.location_categories}
            onCreateOption={onCategoryCreate}
            formatCreateLabel={(label) => `Maak nieuwe categorie: "${label}`}
          />
        </div>
        <button
          type="submit"
          className="block px-3 py- my-2 text-white rounded text-l bg-blue-500"
        >
          Uploaden
        </button>
      </form>
    </div>
  );
};

export default EditLocation;
