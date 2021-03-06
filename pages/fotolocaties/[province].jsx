import React, { useEffect, useRef, useState } from "react";
import { findNearbyLocations } from "../../components/shared/FindNearbyLocations.jsx";
import ResultMap from "../../components/shared/ResultMap.jsx";
import CategorieFilter from "../../components/shared/CategorieFilter.jsx";
import LocationList from "../../components/shared/LocationList.jsx";
import { useRouter } from "next/router";
import Head from "next/head";

const Results = ({ locations, province }) => {
  const [allLocations, setAllLocations] = useState(locations);
  const [filteredLocations, setFilteredLocations] = useState({});
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const searchResults = useRef(null);

  useEffect(() => { 
    setShowMap(false);
    setShowMap(true);
  }, [province]);

  useEffect(() => {
    setShowMap(false);
    if (allLocations !== locations) {
      setAllLocations(locations);
    }


    const _activeFilter = getFilterFromUrl();
    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    } else {
      setFilteredLocations(locations);
    }

    setShowMap(true);
  }, [router]);

  useEffect(() => {
    if (activeFilter === "") {
      setFilteredLocations(allLocations);
    } else {
      filterAndSetLocations();
    }
  }, [activeFilter]);

  const filterAndSetLocations = () => {
    const _filteredLocations = allLocations.filter((location) => {
      let includeInFilter = false;
      for (let i = 0; i < location.location_categories.length; i++) {
        if (location.location_categories[i].value === activeFilter)
          includeInFilter = true;
      }
      return includeInFilter;
    });

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
    if (e.target.value === "alle") {
      setActiveFilter("");
    } else {
      setActiveFilter(e.target.value);
    }
  };

  const selectLocation = (locationId) => {
    setSelectedLocation(locationId);
  };

  const ucProvince = () => {
    return province.charAt(0).toUpperCase() + province.substring(1);
  }

  const onScroll = e => {
    localStorage.setItem(province, e.target.scrollTop);
  };

  useEffect(() => {
    const cat = localStorage.getItem(province);
    if(cat) {
      setTimeout(() => {
        searchResults.current.scrollTop = cat;
      },0);
    }
    else {
      setTimeout(() => {
        searchResults.current.scrollTop = 0;
      },0);
    }
  }, [province]);

  return (
    <div className="relative h-screen">
      <Head>

        {/* <!-- Primary Meta Tags --> */}
        <title key="title">Beste fotolocaties in {ucProvince()} | Spotshare</title>
        <meta
          name="title"
          key="meta_title"
          content={`Beste fotolocaties in ${ucProvince()} | Spotshare`}
        />
        <meta
          name="description"
          key="meta_desc"
          content={`De mooiste fotolocaties in ${ucProvince()} vind je bij SpotShare. Onze leden hebben ${ucProvince()} zo compleet mogelijk in beeld gebracht. Voeg ook jouw foto toe!`}
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta
          property="og:title"
          key="og_title"
          content={`Beste fotolocaties in ${ucProvince()} | Spotshare`}
        />
        <meta
          property="og:description"
          key="og_desc"
          content={`De mooiste fotolocaties in ${ucProvince()} vind je bij SpotShare. Onze leden hebben ${ucProvince()} zo compleet mogelijk in beeld gebracht. Voeg ook jouw foto toe!`}
        />
        <meta property="og:image"
          key="og_img" content={locations[0].photos[0].photo[0].url} />

        {/* <!-- Twitter --> */}
        <meta
          property="twitter:title"
          key="twitter_title"
          content={`Beste fotolocaties in ${ucProvince()} | Spotshare`}
        />
        <meta
          property="twitter:description"
          key="twitter_desc"
          content={`De mooiste fotolocaties in ${province} vind je bij SpotShare. Onze leden hebben ${province} zo compleet mogelijk in beeld gebracht. Voeg ook jouw foto toe!`}
        />
        <meta property="twitter:image"
          key="twitter_img" content={locations[0].photos[0].photo[0].url} />
      </Head>
      <div className="relative h-screen">
        <div className="block lg:flex h-full">
          <div className="w-full p-4 h-screen overflow-scroll" id="searchResults" ref={searchResults} onScroll={onScroll}>
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
          <div>
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
    </div>
  );
};

export default Results;

export async function getStaticPaths() {
  // build the graphql query
  const results = [
    "noord-holland",
    "zuid-holland",
    "zeeland",
    "flevoland",
    "noord-brabant",
    "limburg",
    "overijssel",
    "gelderland",
    "drenthe",
    "groningen",
    "friesland",
    "utrecht",
  ];

  const paths = results.map((result) => ({
    params: { province: result },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { province } = params;

  let lat;
  let lng;
  let distance;

  switch (province) {
    case "noord-holland":
      lat = 52.653922;
      lng = 4.783705;
      distance = 40;
      break;
    case "zuid-holland":
      lat = 51.9556;
      lng = 4.510113;
      distance = 35;
      break;
    case "zeeland":
      lat = 51.469206;
      lng = 3.873701;
      distance = 40;
      break;
    case "flevoland":
      lat = 52.524528;
      lng = 5.7120413;
      distance = 25;
      break;
    case "noord-brabant":
      lat = 51.589303;
      lng = 5.218802;
      distance = 45;
      break;
    case "limburg":
      lat = 51.249511;
      lng = 5.948469;
      distance = 45;
      break;
    case "overijssel":
      lat = 52.4449;
      lng = 6.446756;
      distance = 45;
      break;
    case "gelderland":
      lat = 52.063504;
      lng = 6.082755;
      distance = 45;
      break;
    case "drenthe":
      lat = 52.868337;
      lng = 6.665114;
      distance = 45;
      break;
    case "groningen":
      lat = 53.258348;
      lng = 6.824746;
      distance = 45;
      break;
    case "friesland":
      lat = 53.104194;
      lng = 5.880207;
      distance = 45;
      break;
    case "utrecht":
      lat = 52.079965;
      lng = 5.1963103;
      distance = 20;
      break;
  }

  // build the graphql query

  const locations = await findNearbyLocations(lat, lng, "", distance);
  // console.log(locations);

  return {
    props: {
      locations,
      province
    },
  };
}
