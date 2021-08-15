import React, { useState, useEffect } from "react";
import graphQLFetch from "../../../graphQLFetch.js";
import { useRouter } from "next/router";
import Head from "next/head";
import { userContext } from "../../../services/userContext.js";
import Link from "next/link";
import { RiLoader4Line } from "react-icons/ri"
import moment from "moment";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { FaSpinner } from "react-icons/fa";
import slugify from "slugify";

const animatedComponents = makeAnimated();

const EditPhotoWrapper = () => {

    return <userContext.Consumer>
        {(value) => {
            console.log(value);
            if (value.user) {
                return (
                    <EditPhoto
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

const EditPhoto = () => {
    const router = useRouter();
    const [photo, setPhoto] = useState();
    const [photoCategoryValues, setPhotoCategoryValues] = useState();
    const [selectedPhotoCategories, setSelectedPhotoCategories] = useState(
        []
    );
    const [creatableValues, setCreatableValues] = useState([]);
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        title: "",
        desc: "",
        date: "",
        shutterspeed: "",
        iso: "",
        aperture: "",
        camera: "",
        focalLength: "",
    });

    const fetchData = async () => {
        let result;
        const { slug } = router.query;

        const query = `
        query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                id
                title
                desc
                photo {
                    url
                }
                slug
                date
                brand
                shutterspeed
                iso
                aperture
                camera
                photo_categories {
                    label
                    value
                    id
                }
                comments {
                    id
                    body
                    parent {
                        id
                    }
                    user {
                        profilePicture {
                            url
                        }
                        slug
                        username 
                        firstname
                        lastname
                    }
                }
                likes
                focalLength
                usersLike {
                    id
                }
                location {
                    longitude
                    latitude
                    id
                    title
                    slug
                }
                user {
                    id
                    slug
                    username
                    firstname
                    lastname
                    profilePicture {
                        url
                    }
                }
            }
        }`;

        if (slug) {
            result = await graphQLFetch(query, { slug }, true);
        }

        if (result && result.photoBySlug) {
            setPhoto(result.photoBySlug);

            const catIds = result.photoBySlug.photo_categories.map(
                (category) => category.id
            );

            setSelectedPhotoCategories(catIds);
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

        const query = `mutation CreatePhotoCategory($input: createPhotoCategoryInput) {
            createPhotoCategory(input: $input){
            photoCategory{
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
            const { label, value, id } = data.createPhotoCategory.photoCategory;

            const newCategory = {
                label: label,
                value: value,
                id: id,
            };

            const oldCategories = [...photoCategoryValues];
            oldCategories.push(newCategory);
            setPhotoCategoryValues(oldCategories);

            const oldIds = [...selectedPhotoCategories];
            oldIds.push(id);
            setSelectedPhotoCategories(oldIds);

            const oldCreatableValues = [...creatableValues];
            oldCreatableValues.push(newCategory);
            setCreatableValues(oldCreatableValues);

            // return {
            //     label: label,
            //     value: value,
            //     id: id,
            // };
        }
    };

    const fetchCategories = async () => {
        // build the graphql query
        const query = `query photoCategories{
            photoCategories {
              label
              value
              id
            }
          }`;
        const result = await graphQLFetch(query, {}, true);

        setPhotoCategoryValues(result.photoCategories);
    };


    useEffect(() => {
        fetchData();
        fetchCategories();
    }, [router.query]);

    useEffect(() => {
        if (photo) {
            setCreatableValues(photo.photo_categories);
            setValues({
                title: photo.title,
                desc: photo.desc,
                date: photo.date,
                shutterspeed: photo.shutterspeed,
                iso: photo.iso,
                aperture: photo.aperture,
                camera: photo.camera,
                focalLength: photo.focalLength,
            });
        }
    }, [photo]);


    const onInputChange = (e) => {
        const _values = { ...values };
        if (e.target.name === 'date') {
            _values[e.target.name] = moment(e.target.value).format();
        } else {
            _values[e.target.name] = e.target.value;
        }
        setValues(_values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const oldPhoto = { ...photo };

        oldPhoto.title = values.title;
        oldPhoto.desc = values.desc;
        oldPhoto.date = values.date;
        oldPhoto.shutterspeed = values.shutterspeed;
        oldPhoto.iso = values.iso;
        oldPhoto.aperture = values.aperture;
        oldPhoto.camera = values.camera;
        oldPhoto.focalLength = values.focalLength;

        values.photo_categories = selectedPhotoCategories;

        // console.log(oldPhoto);

        const query = `mutation updatePhoto($input: updatePhotoInput) {
              updatePhoto(input: $input){
              photo{
                slug
                id
              }
            }
          }`;

        let input = {};
        input["where"] = { id: oldPhoto.id };
        input["data"] = values;

        delete input.data.id;

        console.log(input);
        const data = await graphQLFetch(query, { input }, true);

        if (data) {
            const { slug } = data.updatePhoto.photo;
            router.push(`/foto/${slug}`);
        } else {
            alert('Er is iets mis gegaan, probeer het opnieuw!');
            setLoading(false);
        }

    };

    const handleSelect = (newValues, action) => {
        console.log(newValues, action);
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

        // const oldCreatableValues = [...creatableValues];
        // oldCreatableValues.push(...newValues);
        setCreatableValues(newValues);
        setSelectedPhotoCategories(ids);
    };


    const inputDateValue = (date) => {
        // "2021-07-30"
        return moment(date).format("YYYY-MM-DD");
    }

    return !photo ? (
        <div className="w-screen h-screen flex items-center justify-center">
            <RiLoader4Line className="spin text-3xl text-gray-500" />
        </div>
    ) : (
        <div>
            <form
                name="updatePhoto"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                className="photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6 z-1"
            >
                <Head>
                    <meta name="robots" content="noindex,nofollow,noarchive" key="robots" />
                </Head>
                <h1 className="my-2 font-bold">
                    Foto {photo.title} bewerken
                </h1>
                <input
                    type="text"
                    name="title"
                    placeholder="Titel"
                    value={values.title || ""}
                    onChange={onInputChange}
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Datum"
                    value={inputDateValue(values.date) || ""}
                    onChange={onInputChange}
                />

                <div className="flex">
                    <div className="flex flex-wrap items-stretch w-full relative mb-2 mr-2">
                        <input
                            type="text"
                            name="shutterspeed"
                            placeholder="Sluitertijd"
                            value={values.shutterspeed || ""}
                            onChange={onInputChange}
                            className="special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-r-none py-2 px-3 relative text-sm"
                        />
                        <div className="flex -mr-px">
                            <span className="mb-2 flex items-center  bg-grey-lighter rounded rounded-l-none border border-l-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">
                                s
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-stretch w-full relative mb-2 mr-2">
                        <div className="flex -mr-px">
                            <span className="mb-2 flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">
                                iso
                            </span>
                        </div>
                        <input
                            type="text"
                            name="iso"
                            placeholder="iso"
                            value={values.iso || ""}
                            onChange={onInputChange}
                            className="special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
                        />
                    </div>

                    <div className="flex flex-wrap items-stretch w-full relative mb-2">
                        <div className="flex -mr-px">
                            <span className="mb-2 flex items-center  bg-grey-lighter rounded rounded-r-none border border-r-0 border-gray-400 py-2 px-3 whitespace-no-wrap text-grey-dark text-sm">
                                f/
                            </span>
                        </div>
                        <input
                            type="text"
                            name="aperture"
                            placeholder="Diafragma"
                            onChange={onInputChange}
                            value={values.aperture || ""}
                            className="special mb-0 flex-shrink flex-grow flex-auto  w-px flex-1 border h-10 border-gray-400 rounded rounded-l-none py-2 px-3 relative text-sm"
                        />
                    </div>
                </div>
                <input
                    type="text"
                    name="camera"
                    placeholder="camera"
                    onChange={onInputChange}
                    value={values.camera || ""}
                />
                <input
                    type="text"
                    name="focalLength"
                    value={values.focalLength || ""}
                    onChange={onInputChange}
                    placeholder="Focal Length"
                />

                <div className="relative z-1 mb-2">
                    <CreatableSelect
                        components={animatedComponents}
                        isMulti
                        onChange={(e) => {
                            handleSelect(e);
                        }}
                        options={photoCategoryValues}
                        placeholder="Categorieën"
                        value={creatableValues}
                        onCreateOption={onCategoryCreate}
                        formatCreateLabel={(label) => `Maak nieuwe categorie: "${label}`}
                    />
                </div>

                <textarea
                    type="text"
                    name="desc"
                    value={values.desc || ""}
                    onChange={onInputChange}
                    placeholder="Beschrijving"
                />

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

export default EditPhotoWrapper;
