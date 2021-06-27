import React, { useEffect, useState } from "react";
import { findNearbyLocations } from "../../components/shared/FindNearbyLocations.jsx";
import ResultMap from "../../components/shared/ResultMap.jsx";
import CategorieFilter from "../../components/shared/CategorieFilter.jsx";
import LocationList from "../../components/shared/LocationList.jsx";
import { useRouter } from "next/router";

const Results = ({ locations }) => {
  const [allLocations, setAllLocations] = useState(locations);
  const [filteredLocations, setFilteredLocations] = useState({});
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(locations);
    if (allLocations !== locations) {
      setAllLocations(locations);
    }

    const _activeFilter = getFilterFromUrl();
    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    } else {
      setFilteredLocations(allLocations);
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
    console.log(allLocations);
    const _filteredLocations = allLocations.filter((location) => {
      let includeInFilter = false;
      for (let i = 0; i < location.location_categories.length; i++) {
        console.log(location.location_categories[i].value, activeFilter);
        if (location.location_categories[i].value === activeFilter)
          includeInFilter = true;
      }
      console.log(includeInFilter);
      return includeInFilter;
    });

    console.log(_filteredLocations);

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
    let url = "";
    if (reset) {
      url = `/fotolocaties/resultaten?lng=${router.query.lng}&lat=${router.query.lat}`;
    } else {
      url = `/fotolocaties/resultaten?lng=${router.query.lng}&lat=${router.query.lat}&categorie=${e.target.value}`;
    }

    router.replace(url, url, { scroll: false });
    setActiveFilter(e.target.value);
  };

  const selectLocation = (locationId) => {
    setSelectedLocation(locationId);
  };

  return (
    <div className="relative h-screen">
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

export async function getServerSideProps(context) {
  console.log(context.query.lat, context.query.lng);
  // build the graphql query

  const locations = await findNearbyLocations(
    context.query.lat,
    context.query.lng
  );
  console.log(locations);

  return {
    props: {
      locations,
    },
  };
}
