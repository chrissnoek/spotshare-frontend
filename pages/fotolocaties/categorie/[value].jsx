import React, { useEffect, useState, useRef } from "react";
import ResultMap from "../../../components/shared/ResultMap.jsx";
import graphQLFetch from "../../../graphQLFetch.js";
import LocationList from "../../../components/shared/LocationList.jsx";
import { useRouter } from "next/router";
import Head from "next/head"

const LocationsPerCategorie = ({ locations: _locations, value }) => {
  const [locations, setLocations] = useState(_locations);
  const [filteredLocations, setFilteredLocations] = useState({});
  const [selectedLocation, setSelectedLocation] = useState();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const searchResults = useRef(null);


  useEffect(() => {
    const _activeFilter = getActiveFilter();

    if (locations) {
      const _filteredLocations = locations.filter((location) => {
        const include = location.location_categories.filter((categorie) => {
          if (categorie.id === _activeFilter) {
            return true;
          } else {
            return false;
          }
        });
        //console.log(location.id, include);
        if (include.length > 0) return true;
      });
      setFilteredLocations(_filteredLocations);
    }
    //console.log(_filteredLocations);
  }, [router]);

  const getLocations = async () => {
    setLocations(_locations.filter((location) => location.photos.length > 0));
  };

  const getActiveFilter = () => {
    // console.log(router.query);
    // const params = new URLSearchParams(location.search);
    // const _activeFilter = params.get("categorie")
    //   ? params.get("categorie")
    //   : "";
    // if (_activeFilter) {
    //   return _activeFilter;
    // } else {
    //   return false;
    // }
  };

  useEffect(() => {
    const _activeFilter = getActiveFilter();
    if (_activeFilter) {
      setActiveFilter(_activeFilter);
    }
    getLocations();
    setShowMap(true);
  }, []);

  const selectLocation = (locationId) => {
    setSelectedLocation(locationId);
  };

  const onScroll = e => {
    localStorage.setItem(value, e.target.scrollTop);
  };

  useEffect(() => {
    const cat = localStorage.getItem(value);
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
  }, [_locations]);

  if (locations.length > 0 || filteredLocations.length > 0) {
    return (
      <div className="relative h-screen">
        <Head>

          {/* <!-- Primary Meta Tags --> */}
          <title key="title">Fotolocaties met categorie {value} | Spotshare</title>
          <meta
            name="title"
            key="meta_title"
            content={`Fotolocaties met categorie ${value} | Spotshare`}
          />
          <meta
            name="description"
            key="meta_desc"
            content={`Bekijk fotolocaties met categorie ${value} bij Spotshare!`}
          />
          {/* <!-- Open Graph / Facebook --> */}
          <meta
            property="og:title"
            key="og_title"
            content={`Fotolocaties met categorie ${value}| Spotshare`}
          />
          <meta
            property="og:description"
            key="og_desc"
            content={`Bekijk fotolocaties met categorie ${value} bij Spotshare!`}
          />
          {/* <meta property="og:image"
          key="og_img" content={locations[0].photos[0].photo[0].url} /> */}

          {/* <!-- Twitter --> */}
          <meta
            property="twitter:title"
            key="twitter_title"
            content={`Fotolocaties met categorie ${value}| Spotshare`}
          />
          <meta
            property="twitter:description"
            key="twitter_desc"
            content={`Bekijk fotolocaties met categorie ${value} bij Spotshare!`}
          />
          {/* <meta property="twitter:image"
          key="twitter_img" content={locations[0].photos[0].photo[0].url} /> */}
        </Head>
        <div className="block lg:flex h-full">
          <div className="w-full p-4 h-screen overflow-scroll" id="searchResults" ref={searchResults} onScroll={onScroll}>
            <h1>Resultaten</h1>
            {/* <div className="mb-2 flex">
            <span className="mr-2">Filter op categorie:</span>
            {locations &&
              (filteredLocations.length > 0 ? (
                <CategorieFilter
                  active={activeFilter}
                  onFilterChange={onFilterChange}
                  categories={filteredLocations.map((location) => {
                    return location.location_categories;
                  })}
                />
              ) : (
                <CategorieFilter
                  active={activeFilter}
                  onFilterChange={onFilterChange}
                  categories={locations.map((location) => {
                    return location.location_categories;
                  })}
                />
              ))}
          </div> */}
            {locations &&
              (filteredLocations.length > 0
                ? filteredLocations.map((location) => (
                  <div key={location.id} className="w-full">
                    <LocationList
                      size="large"
                      location={location}
                      key={location.id}
                      active={selectedLocation === location.id ? true : false}
                      selectLocation={selectLocation}
                    />
                  </div>
                ))
                : locations.map((location) => (
                  <div key={location.id} className="w-full">
                    <LocationList
                      size="large"
                      location={location}
                      key={location.id}
                      active={selectedLocation === location.id ? true : false}
                      selectLocation={selectLocation}
                    />
                  </div>
                )))}
          </div>

          <div className="mb-10 w-full h-full" id="searchResultsMap">
            {showMap &&
              locations &&
              (filteredLocations.length > 0 ? (
                <ResultMap
                  locations={filteredLocations}
                  selectLocation={selectLocation}
                  active={selectedLocation}
                />
              ) : (
                <ResultMap
                  locations={locations}
                  selectLocation={selectLocation}
                  active={selectedLocation}
                />
              ))}
          </div>
        </div>
      </div>
    )
  } else {
    return null
  };
};

export default LocationsPerCategorie;

// export async function getStaticPaths() {
//   // build the graphql query
//   const query = `
//         query {
//             locationCategories {
//                 value
//         }
//     }
//     `;

//   const vars = {};
//   const result = await graphQLFetch(query, vars, true);

//   const paths = result.locationCategories.map((locationCategory) => ({
//     params: { value: locationCategory.value },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  // build the graphql query
  const query = `query locationCategorie($value:String!){
        locationCategories(where:{value: $value}) {
          label
        value
        locations {
          id
          title
          longitude
          latitude
          slug
          location_categories {
            label
            value
            locations {
              title
            }
          }
          photos {
                id
                likes
                title
                slug
                photo {
                    url 
                    formats
                }
            }
        }
      }
      }`;

  const { value } = params;

  const result = await graphQLFetch(query, { value }, true);


  return {
    props: {
      locations: result.locationCategories[0].locations.filter(
        (location) => location.photos.length > 0
      ),
      value
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 60, // In seconds
  };
}
