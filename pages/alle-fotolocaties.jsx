import React, { useEffect, useState } from "react";
import ResultMap from "../components/shared/ResultMap.jsx";
import CategorieFilter from "../components/shared/CategorieFilter.jsx";
import LocationList from "../components/shared/LocationList.jsx";
import { useRouter } from "next/router";
import Head from "next/head";
import graphQLFetch from "../graphQLFetch";

const Results = ({ locations }) => {
    // console.log(locations);
    const [allLocations, setAllLocations] = useState(locations);
    const [filteredLocations, setFilteredLocations] = useState({});
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedLocation, setSelectedLocation] = useState();
    const [showMap, setShowMap] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // console.log(router);
        setShowMap(false);
        if (allLocations !== locations) {
            console.log('allLocations !== locations');
            console.log(locations);
            setAllLocations(locations);
        }

        console.log(allLocations);

        const _activeFilter = getFilterFromUrl();
        if (_activeFilter) {
            setActiveFilter(_activeFilter);
        } else {
            setFilteredLocations(locations);
        }

        setShowMap(true);
    }, [router]);

    useEffect(() => {
        // console.log({ activeFilter });
        if (activeFilter === "") {
            setFilteredLocations(allLocations);
        } else {
            filterAndSetLocations();
        }
    }, [activeFilter]);

    const filterAndSetLocations = () => {
        // console.log(allLocations);
        const _filteredLocations = allLocations.filter((location) => {
            let includeInFilter = false;
            for (let i = 0; i < location.location_categories.length; i++) {
                // console.log(location.location_categories[i].value, activeFilter);
                if (location.location_categories[i].value === activeFilter)
                    includeInFilter = true;
            }
            // console.log(includeInFilter);
            return includeInFilter;
        });

        // console.log(_filteredLocations);

        setFilteredLocations(_filteredLocations);
    };

    const getFilterFromUrl = () => {
        if (router.query.categorie) {
            return router.query.categorie;
        } else {
            return false;
        }
    };

    const onFilterChange = (e, reset) => {
        // let url = "";
        // if (reset) {
        //   url = `/fotolocaties/resultaten?lng=${router.query.lng}&lat=${router.query.lat}`;
        // } else {
        //   url = `/fotolocaties/resultaten?lng=${router.query.lng}&lat=${router.query.lat}&categorie=${e.target.value}`;
        // }

        // router.replace(url, url, { scroll: false });
        if (e.target.value === "alle") {
            setActiveFilter("");
        } else {
            setActiveFilter(e.target.value);
        }
    };

    const selectLocation = (locationId) => {
        setSelectedLocation(locationId);
    };


    return (
        <div className="relative h-screen">
            <Head>

                {/* <!-- Primary Meta Tags --> */}
                <title key="title">Alle fotolocaties | Spotshare</title>
                <meta
                    name="title"
                    key="meta_title"
                    content={`Alle fotolocaties | Spotshare`}
                />
                <meta
                    name="description"
                    key="meta_desc"
                    content={`De mooiste fotolocaties  vind je bij SpotShare. Onze leden hebben Nederland zo compleet mogelijk in beeld gebracht. Voeg ook jouw foto toe!`}
                />
                {/* <!-- Open Graph / Facebook --> */}
                <meta
                    property="og:title"
                    key="og_title"
                    content={`Alle fotolocaties | Spotshare`}
                />
                <meta
                    property="og:description"
                    key="og_desc"
                    content={`De mooiste fotolocaties vind je bij SpotShare. Onze leden hebben Nederland zo compleet mogelijk in beeld gebracht. Voeg ook jouw foto toe!`}
                />

                {/* <!-- Twitter --> */}
                <meta
                    property="twitter:title"
                    key="twitter_title"
                    content={`Alle fotolocaties | Spotshare`}
                />
                <meta
                    property="twitter:description"
                    key="twitter_desc"
                    content={`De mooiste fotolocatiesvind je bij SpotShare. Onze leden hebben Nederland zo compleet mogelijk in beeld gebracht. Voeg ook jouw foto toe!`}
                />
            </Head>
            <div className="flex h-full">
                <div className="w-full p-4 h-screen overflow-scroll">
                    <h1>Resultaten</h1>
                    <div className="mb-2 flex">
                        <span className="mr-2">Filter op categorie:</span>
                        {allLocations && (
                            <CategorieFilter
                                active={activeFilter}
                                onFilterChange={onFilterChange}
                                categories={allLocations.map((location) => {
                                    return location.location_categories;
                                })}
                            />
                        )}
                    </div>
                    {filteredLocations.length > 0 &&
                        filteredLocations.map((location) => (
                            <div key={location.id} className="w-full">
                                <LocationList
                                    size="large"
                                    location={location}
                                    key={location.id}
                                    active={selectedLocation === location.id ? true : false}
                                    selectLocation={selectLocation}
                                />
                            </div>
                        ))}
                </div>

                <div className="mb-10 w-full h-full">
                    {showMap && filteredLocations.length > 0 && (
                        <ResultMap
                            locations={filteredLocations}
                            selectLocation={selectLocation}
                            active={selectedLocation}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Results;

export async function getStaticProps({ params }) {

    const query = `query location{
            locations {
              id
              latitude
              longitude
              title
              slug
              location_categories {
                id
                value
                label
              }
              photos{
                photo {
                  url
                  formats
                }
              }
            }
          }`;

    // build the graphql query

    const result = await graphQLFetch(query, {}, true);

    // console.log(result);

    return {
        props: {
            locations: result.locations,
        },
        revalidate: 60, // In seconds
    }
}
