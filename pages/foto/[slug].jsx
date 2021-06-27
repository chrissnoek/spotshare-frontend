import React from "react";
import graphQLFetch from "../../graphQLFetch";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import Link from "next/link";
import { userContext } from "../../services/userContext.js";
import FavButton from "../../components/shared/favButton.jsx";
import UserProfilePicture from "../../components/shared/UserProfilePicture.jsx";
import PhotoComment from "../../components/Comments/Comments.jsx";
import { IoCameraOutline } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import CreateNotification from "../../components/shared/CreateNotification.jsx";
import { useRouter } from "next/router";

const MyClassWithRouter = (props) => {
  const router = useRouter();
  return <PhotoDetail {...props} router={router} />;
};
export default MyClassWithRouter;

class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);
    const photoBySlug = props.photoBySlug;
    this.state = {
      isServer: true,
      photoBySlug,
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

  componentDidUpdate() {
    if (this.state.photoBySlug !== this.props.photoBySlug) {
      this.setState({ photoBySlug: this.props.photoBySlug });
    }
  }

  componentDidMount() {
    const { photoBySlug } = this.state;
    if (photoBySlug === null) {
      this.loadData();
    }

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

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

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
    this.setState({ isServer: false });
  }

  updateFav = async (user, likedId, action, receiver) => {
    // TODO: store user.likedPhotos in state, and map favArray from state instead of user object
    // problem: user.likedPhotos is not updated
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            likedPhotos {
              id
            }
          }
        }
      }`;

    let favArray = user.likedPhotos.map((fav) => fav.id);

    if (action === "add") {
      if (!favArray.includes(likedId)) {
        favArray.push(likedId);
        await CreateNotification(user.id, receiver, "like", likedId);
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
          likedPhotos: favArray,
        },
      },
    };

    const data = await graphQLFetch(query, variables, true);
  };

  addComment = async (data, receiver) => {
    console.log(data, receiver);

    const query = `mutation createPhotoComment($input: createPhotoCommentInput){
      createPhotoComment(
        input: $input
      ) {
        photoComment {
          body
          id
          parent {
            id
          }
          user {
            id
            firstname
            lastname
            profilePicture {
              url
            }
            slug
            username
          }
        }
      }
    }`;

    let input = { input: data };
    console.log(input);

    const response = await graphQLFetch(query, input, true, true);
    console.log(response);

    if (response) {
      if (!response.errors) {
        await CreateNotification(
          data.data.user,
          receiver,
          "comment",
          data.data.photo
        );
        let _comments = [...this.state.photoBySlug.comments];
        _comments.push({
          body: response.createPhotoComment.photoComment.body,
          id: response.createPhotoComment.photoComment.id,
          parent: response.createPhotoComment.photoComment.parent,
          user: response.createPhotoComment.photoComment.user,
        });
        this.setState((prevState) => ({
          photoBySlug: { ...prevState.photoBySlug, comments: _comments },
        }));
      } else {
        console.log("an error happened");
      }
    }
  };

  render() {
    const { photoBySlug, redirect, isServer } = this.state;
    if (redirect) {
      this.props.router.push("/niet-gevonden");
    }
    if (photoBySlug === null) {
      return null;
    } else {
      console.log(photoBySlug);
    }

    const { userLocation, userLocationKnown, userMarker } = this.state;

    const position = [
      photoBySlug.location.latitude,
      photoBySlug.location.longitude,
    ];
    const calculatedUserLocation = userLocation.latitude
      ? [userLocation.latitude, userLocation.longitude]
      : null;

    return (
      <div id="page">
        <div
          className="w-full flex flex-col justify-center items-center relative bg-black"
          style={{
            height: "80vh",
          }}
        >
          <img
            className="px-6 py-6 h-full w-full object-contain"
            src={photoBySlug.photo[0].url}
            alt={photoBySlug.title}
          />

          {!isServer && (
            <div className="absolute right-0 bottom-0 m-6">
              <userContext.Consumer>
                {(value) => {
                  if (value.user) {
                    if (value.user.id === photoBySlug.user.id) {
                      return;
                    }
                    let favourite;
                    if (
                      value.user &&
                      photoBySlug.usersLike.filter(
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
                        likedId={photoBySlug.id}
                        addTitle="Toevoegen aan favorieten"
                        removeTitle="Verwijderen uit favorieten"
                        receiver={photoBySlug.user.id}
                      />
                    );
                  }
                }}
              </userContext.Consumer>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="container mx-auto sm:mt-6">
            <div className="block sm:flex">
              <div id="photoInfo" className="w-full sm:mr-6 md:mr-12">
                <h1 className="text-2xl font-bold mb-1 text-gray-800 block">
                  {photoBySlug.title}
                </h1>
                <p className="text-gray-600 mb-6">{photoBySlug.desc}</p>

                <hr />

                <PhotoComment
                  comments={photoBySlug.comments}
                  photoId={photoBySlug.id}
                  addComment={this.addComment}
                  receiver={photoBySlug.user.id}
                />
              </div>

              <div className="w-full">
                <div className="relative block sm:flex sm:items-center sm:w-full">
                  <Link href={`/fotograaf/${photoBySlug.user.username}`}>
                    <a className="top-0 left-0 h-full w-full absolute"></a>
                  </Link>
                  <div className="mx-auto sm:mx-0 mb-2 sm:mr-4">
                    <UserProfilePicture profile={photoBySlug.user} />
                  </div>
                  <h1 className="font-bold text-xl leading-tight">
                    {photoBySlug.user.username}
                  </h1>
                </div>

                <div className="my-4">
                  {photoBySlug.camera && (
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <IoCameraOutline className="text-2xl" />
                      </div>
                      <div>{photoBySlug.camera}</div>
                    </div>
                  )}
                  {(photoBySlug.focalLength ||
                    photoBySlug.aperture ||
                    photoBySlug.iso ||
                    photoBySlug.shutterspeed) && (
                    <div className="flex items-center">
                      <div className="mr-2">
                        <GoSettings className="text-2xl" />
                      </div>
                      {photoBySlug.focalLength && (
                        <div className="mr-2">{photoBySlug.focalLength}</div>
                      )}
                      {photoBySlug.aperture && (
                        <div className="mr-2">{photoBySlug.aperture}</div>
                      )}
                      {photoBySlug.iso && (
                        <div className="mr-2">{photoBySlug.iso}</div>
                      )}
                      {photoBySlug.shutterspeed && (
                        <div className="mr-2">{photoBySlug.shutterspeed}</div>
                      )}
                    </div>
                  )}
                </div>

                <Link href={`/fotolocatie/${photoBySlug.location.slug}`}>
                  <h2>{photoBySlug.location.title}</h2>
                </Link>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getStaticPaths() {
  // build the graphql query
  const query = `
        query photoBySlug{
            photos {
                slug
            }
        }`;

  const vars = {};
  const result = await graphQLFetch(query, vars, true);

  const paths = result.photos.map((photo) => ({
    params: { slug: photo.slug.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // build the graphql query
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
                    profilePicture {
                        url
                    }
                }
            }
        }`;

  const { slug } = params;

  const result = await graphQLFetch(query, { slug }, true);
  console.log("result", result);

  return {
    props: {
      photoBySlug: result.photoBySlug,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
}
