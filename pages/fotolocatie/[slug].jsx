/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React from "react";
import graphQLFetch from "../../graphQLFetch";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import FavButton from "../../components/shared/favButton.jsx";
import { userContext } from "../../services/userContext.js";
import PhotoView from "../../components/shared/PhotoView.jsx";
import { useRouter } from "next/router";

const LocationDetailStrapi = (props) => {
  // console.log(props);
  const router = useRouter();
  return (
    <userContext.Consumer>
      {(value) => {
        if (value.user) {
          return (
            <LocationDetailComponentRouter
              curUser={value.user}
              {...props}
              router={router}
            />
          );
        } else {
          return (
            <LocationDetailComponentRouter
              curUser={null}
              {...props}
              router={router}
            />
          );
        }
      }}
    </userContext.Consumer>
  );
};
export default LocationDetailStrapi;

class LocationDetailComponent extends React.Component {
  constructor(props) {
    super(props);

    const locationBySlug = props.locationBySlug;

    this.state = {
      isServer: true,
      userLikedLocation: false,
      locationBySlug,
      redirect: false,
      zoom: 13,
      userLocationKnown: false,
      userMarker: null,
      userLocation: {
        longitude: null,
        latitude: null,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.locationBySlug !== this.props.locationBySlug) {
      this.setState({ locationBySlug: this.props.locationBySlug });
    }

    const { curUser: prevCurUser } = prevProps;
    const { curUser } = this.props;
    const { locationBySlug, isServer } = this.state;

    if (!isServer && curUser != null && prevCurUser !== curUser) {
      // there is a logged in user
      // console.log(curUser);
      // console.log(this.state);
      // console.log(locationBySlug);

      if (
        locationBySlug.usersFavourites.filter(
          (favourites) => favourites.id === curUser.id
        ).length > 0
      ) {
        // check if user alreay liked the location
        this.setState({ userLikedLocation: true });
      }
    }
  }

  componentDidMount() {
    // loading leaflet in componentDidMount because it doenst support SSR
    const L = require("leaflet");

    const userMarker = new L.Icon({
      iconUrl: "/images/userMarker.svg",
      iconRetinaUrl: "/images/userMarker.svg",

      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/images/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
    });

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: "/images/locationMarker.svg",
      iconRetinaUrl: "/images/locationMarker.svg",
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/images/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
    });

    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (pos) => {
      var crd = pos.coords;

      // console.log("Your current position is:");
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log(`More or less ${crd.accuracy} meters.`);

      this.setState((prevState) => ({
        ...prevState,
        userMarker,
        userLocationKnown: true,
        userLocation: { longitude: crd.longitude, latitude: crd.latitude },
      }));
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);

      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((location) => {
          this.setState((prevState) => ({
            ...prevState,
            userMarker,
            userLocationKnown: true,
            userLocation: {
              longitude: location.longitude,
              latitude: location.latitude,
            },
          }));
        });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  async loadData() {
    // get the search query string form url
    const { match } = this.props;
    // provide the query with the variables
    const data = await LocationDetailComponent.fetchData(match);
    // console.log(data);
    if (data.locationBySlug != null) {
      this.setState({ locationBySlug: data.locationBySlug, isServer: false });
    } else {
      // console.log("return not found");
      this.setState({ redirect: true });
      // console.log(this.state);
    }
  }

  updateFav = async (user, likedId, action) => {
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            favouriteLocations {
              id
            }
          }
        }
      }`;

    let favArray = user.favouriteLocations.map((fav) => fav.id);

    if (action === "add") {
      if (!favArray.includes(likedId)) {
        favArray.push(likedId);
      } else {
        // already in favourites
        return;
      }
    } else if (action === "remove") {
      if (favArray.includes(likedId)) {
        // likedId is in array, so remove it from array
        const index = favArray.indexOf(likedId);
        if (index > -1) {
          favArray.splice(index, 1);
        }
        // console.log(favArray);
      } else {
        // not in favourites
        return;
      }
    }

    const variables = {
      input: {
        where: {
          id: user.id,
        },
        data: {
          favouriteLocations: favArray,
        },
      },
    };

    const data = await graphQLFetch(query, variables, true);

    let status = this.state.userLikedLocation;
    this.setState({ userLikedLocation: !status });
  };

  render() {
    const { locationBySlug, redirect, isServer } = this.state;
    if (redirect) {
      // console.log("redirect", redirect);
      this.props.router.push("/niet-gevonden");
    }
    if (locationBySlug === null) return null;

    const { userLocation, userLocationKnown, userMarker } = this.state;
    const { photos } = locationBySlug;

    const position = [locationBySlug.latitude, locationBySlug.longitude];
    const calculatedUserLocation = userLocation.latitude
      ? [userLocation.latitude, userLocation.longitude]
      : null;

    return (
      <div id="page">
        <div id="photoInfo">
          <div
            className="w-full flex flex-col justify-center items-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${
                photos.sort((a, b) => b.likes - a.likes)[0].photo[0].url
              })`,
              backgroundSize: `cover`,
              backgroundPosition: `center center`,
              height: "80vh",
            }}
          >
            <h1 className="text-3xl font-bold mb-1 text-white block">
              {locationBySlug.title}
            </h1>
            <span className="flex items-center">
              <span className="text-gray-500 mr-2 text-sm">Categorieen:</span>
              {locationBySlug.location_categories.map((location) => (
                <Link href={`/fotolocaties/categorie/${location.value}`}>
                  <a className="bg-green-500 py-1 px-3 text-sm rounded-full mr-2 text-white hover:bg-green-600">
                    {location.label}
                  </a>
                </Link>
              ))}
            </span>

            <div className="absolute right-0 bottom-0 m-10">
              <userContext.Consumer>
                {(value) => {
                  // console.log(value);
                  if (value.user) {
                    let favourite;
                    if (
                      value.user &&
                      locationBySlug.usersFavourites.filter(
                        (favourites) => favourites.id === value.user.id
                      ).length > 0
                    ) {
                      favourite = true;
                    } else {
                      favourite = false;
                    }
                    return (
                      <FavButton
                        favourite={favourite}
                        updateFav={this.updateFav}
                        user={value.user}
                        likedId={locationBySlug.id}
                        addTitle="Deze locatie opslaan"
                        removeTitle="Verwijderen uit opgeslagen locaties"
                      />
                    );
                  }
                }}
              </userContext.Consumer>

              <Link href={`/foto/toevoegen/${locationBySlug.id}`}>
                <a className="revealTooltip flex pointer justify-end items-center">
                  <div className="hidden  bg-white rounded py-1 px-3 h-8">
                    Foto aan deze locatie toevoegen
                  </div>
                  <div className="inline-block bg-white rounded py-2 px-3 h-8">
                    <FaPlus />
                  </div>
                </a>
              </Link>
            </div>
            {/* 
            <p className="">Bezoekers:</p>
            {locationBySlug.photos.map((photo) => {
              return <img src={photo.user.picture} />;
            })} */}
          </div>

          <div className="p-6 ">
            <section className="container">
              <div className="sm:py-10">
                <div className="block sm:flex">
                  <div className="pb-4 mr-4 w-full">
                    <h2 className="h1">
                      Over fotolocatie {locationBySlug.title}
                    </h2>
                    <p className="">{locationBySlug.desc}</p>
                  </div>
                  <div className="pb-4 w-full">
                    <h3>Hoe kom ik bij {locationBySlug.title}</h3>
                    <p className="">{locationBySlug.directions}</p>
                  </div>
                </div>
                <div className="block sm:flex">
                  <div className="pb-4 mr-4 w-full">
                    <h3>Wat kan ik fotograferen?</h3>
                    <p className="">{locationBySlug.whattoshoot}</p>
                  </div>
                  <div className="pb-4 w-full">
                    <h3>Beste tijd om te fotograferen?</h3>
                    {locationBySlug.months.map((month) => (
                      <p className="mr-1 inline-block">{month.label}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <Map
                  className="map"
                  id="photoLocation"
                  center={position}
                  zoom={this.state.zoom}
                >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>Foto locatie</Popup>
                  </Marker>
                  {userLocationKnown && (
                    <Marker position={calculatedUserLocation} icon={userMarker}>
                      <Popup>Jouw locatie</Popup>
                    </Marker>
                  )}
                </Map>
              </div>

              <div className="w-full mt-4">
                <h2 className="text-xl font-bold mb-1 text-gray-800 block">
                  Foto's gemaakt op fotolocatie {locationBySlug.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {photos.map((photoItem, index) => {
                    return (
                      <PhotoView
                        key={photoItem.id}
                        index={index}
                        photo={photoItem}
                        deletePhoto={null}
                      />
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

function LocationPhotoItem(props) {
  const itemPhoto = props.item.photo[0];
  const selectedLocation = `/foto/${props.item.slug}`;
  return (
    <React.Fragment>
      <div className="w-full inline-block md:w-1/2 lg:w-1/3 p-2">
        <div className="photoCard rounded relative shadow-xs">
          <div className="relative rounded overflow-hidden">
            <NavLink
              to={selectedLocation}
              className="absolute w-full h-full z-10"
              title="Bekijk foto nu"
            ></NavLink>
            <img
              src={itemPhoto.url.replace("-original", "-thumbnail")}
              className="object-cover  w-full h-48  block"
              alt="Foto"
            />

            <div className="photoContent p-4 absolute bottom-0 left-0">
              <div className="photoInfo">
                <h3 className="text-white">{props.item.title}</h3>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const LocationDetailComponentRouter = LocationDetailComponent;

export async function getStaticPaths() {
  // build the graphql query
  const query = `
        query {
            locations {
                slug
            }
        }
    `;

  const vars = {};
  const result = await graphQLFetch(query, vars, true);
  // console.log("urls", result);

  const paths = result.locations.map((location) => ({
    params: { slug: location.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // build the graphql query
  const query = `query locationBySlug($slug: String!){
    locationBySlug(slug: $slug) {
        title
        photos(where:{user_null:false}) {
            likes
            id
            location {
              longitude
              latitude
              id
              title
              slug
            }
            title
            slug
            user {
              
              id
              firstname
              lastname
            }
            photo {
                id
                name
                url
            }
        }
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
        }
        months {
          label
          value
        }
        usersFavourites {
          id
        }
    }
}`;

  const { slug } = params;

  const result = await graphQLFetch(query, { slug }, true);
  // console.log("result", result);

  return {
    props: {
      locationBySlug: result.locationBySlug,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
}
