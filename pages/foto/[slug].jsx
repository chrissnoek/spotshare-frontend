import React, { useEffect, useState } from "react";
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
import Head from "next/head";
import { GrLocation } from 'react-icons/gr';
import { FiCalendar } from 'react-icons/fi';
import { BsPencil } from "react-icons/bs";
import moment from "moment";
import 'moment/locale/nl';


const MyClassWithRouter = (props) => {
  const [isServer, setIsServer] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsServer(false);
  }, []);

  {
    return !isServer ?
      <userContext.Consumer>
        {(value) => {
          if (value.user) {
            if (value.user.id === props.photoBySlug.user.id) {
              console.log(value.user.id, props.photoBySlug.user.id);
              return <PhotoDetail {...props} router={router} ownPhoto={true} me={value.user} />;
            } else {
              return <PhotoDetail {...props} router={router} ownPhoto={false} me={value.user} />;
            }
          } else {
            return <PhotoDetail {...props} router={router} ownPhoto={false} me={false} />;
          }
        }}
      </userContext.Consumer>
      : <PhotoDetail {...props} router={router} ownPhoto={false} me={false} />
  }

};
export default MyClassWithRouter;

class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);

    const { photoBySlug, ownPhoto, me } = props;
    console.log(photoBySlug);
    this.state = {
      photoFaves: photoBySlug.usersLike.map((fav) => fav.id),
      myFaves: me ? me.likedPhotos.map((fav) => fav.id) : [],
      isServer: true,
      photoBySlug,
      ownPhoto,
      redirect: false,
      zoom: 13,
      userLocationKnown: false,
      userMarker: null,
      userLocation: {
        longitude: null,
        latitude: null,
      },
      loadingComment: false,
    };
  }

  componentDidUpdate() {
    if (this.state.photoBySlug.id !== this.props.photoBySlug.id) {
      this.setState({ photoBySlug: this.props.photoBySlug });
    }
    if (this.state.ownPhoto !== this.props.ownPhoto) {
      this.setState({ ownPhoto: this.props.ownPhoto });
    }
  }

  componentDidMount() {
    moment.locale('nl');
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

      const me = this.props.me;
      let _myFaves = [...this.state.myFaves];
      let _photoFaves = [...this.state.photoFaves];
      let createNotification = false;

    if (action === "add") {
      // add user id to photoLikes
      if (!_photoFaves.includes(me.id)) { 
        _photoFaves.push(me.id);

      } else {
        // already in favourites
        return;
      }

      if (!_myFaves.includes(likedId)) {
        _myFaves.push(likedId);
        createNotification = true;
      } else {
        // already in favourites
        return;
      }
    } else if (action === "remove") {


      if (_photoFaves.includes(me.id)) {
        // likedId is in array, so remove it from array
        const index = _photoFaves.indexOf(me.id);
        if (index > -1) {
          _photoFaves.splice(index, 1);
        }
		  } else {
        // not in favourites
        return;
		  }

      if (_myFaves.includes(likedId)) {
        // likedId is in array, so remove it from array
        const index = _myFaves.indexOf(likedId);
        if (index > -1) {
          _myFaves.splice(index, 1);
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
          likedPhotos: _myFaves,
        },
      },
    };

    const data = await graphQLFetch(query, variables, true);


    if(data.updateUser) {
      if(createNotification) {
        await CreateNotification(user.id, receiver, "like", likedId);
        this.setState({ photoFaves: _photoFaves });
        this.setState({ myFaves: _myFaves });
      }
    }
    
  };

  addComment = async (data, receiver) => {
    this.setState({ loadingComment: true });
    // console.log(data, receiver);

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
    // console.log(input);

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
        console.log(_comments);
        _comments.push(response.createPhotoComment.photoComment);
        console.log(_comments);
        this.setState((prevState) => ({
          photoBySlug: { ...prevState.photoBySlug, comments: _comments },
        }));
        this.setState({ loadingComment: false });
      } else {
        // console.log("an error happened");
        this.setState({ loadingComment: false });
      }
    }
  };

  dateReadable = (date) => {
    return moment(date).format("dddd, DD MMMM YYYY");
  }

  render() {
    const { photoBySlug, redirect, isServer, ownPhoto } = this.state;
    if (redirect) {
      this.props.router.push("/niet-gevonden");
    }
    if (photoBySlug === null) {
      return null;
    } else {
      console.log('photoBySlug on rerender: ', photoBySlug);
    }

    const { userLocation, userLocationKnown, userMarker, loadingComment } = this.state;

    const position = [
      photoBySlug.location.latitude,
      photoBySlug.location.longitude,
    ];
    const calculatedUserLocation = userLocation.latitude
      ? [userLocation.latitude, userLocation.longitude]
      : null;

    return (
      <div id="page">
        <Head>

          {/* <!-- Primary Meta Tags --> */}
          <title key="title">{photoBySlug.title} door {photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username}  | Spotshare</title>
          <meta
            name="title"
            key="meta_title"
            content={`${photoBySlug.title} door ${photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username}  | Spotshare`}
          />
          <meta
            name="description"
            key="meta_desc"
            content={`Bekijk ${photoBySlug.title} door ${photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username} op fotolocatie ${photoBySlug.location.title}`}
          />
          {/* <!-- Open Graph / Facebook --> */}
          <meta
            property="og:title"
            key="og_title"
            content={`${photoBySlug.title} door ${photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username}  | Spotshare`}
          />
          <meta
            property="og:description"
            key="og_desc"
            content={`Bekijk ${photoBySlug.title} door ${photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username} op fotolocatie ${photoBySlug.location.title}`}
          />
          <meta property="og:image"
            key="og_img" content={photoBySlug.photo[0].url} />

          {/* <!-- Twitter --> */}
          <meta
            property="twitter:title"
            key="twitter_title"
            content={`${photoBySlug.title} door ${photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username}  | Spotshare`}
          />
          <meta
            property="twitter:description"
            key="twitter_desc"
            content={`Bekijk ${photoBySlug.title} door ${photoBySlug.user.firstname ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname : photoBySlug.user.username} op fotolocatie ${photoBySlug.location.title}`}
          />
          <meta property="twitter:image"
            key="twitter_img" content={photoBySlug.photo[0].url} />
        </Head>
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
                    let favourite;
                    if (
                      value.user &&
                      this.state.photoFaves.filter(
                        (favourites) => favourites === value.user.id
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
                        type="photo"
                        count={this.state.photoFaves.length}
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
                <p className="text-gray-600 mb-6">
                  {photoBySlug.desc ?
                    <div>{photoBySlug.desc.replace(/(<([^>]+)>)/gi, "")} {ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link>}</div>
                    : (ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}>
                      <a className=" flex  items-center">
                        <div className=" mr-2">
                          Informatie aanvullen
                        </div>
                        <div className="">
                          <BsPencil />
                        </div>
                      </a>
                    </Link>)
                  }
                </p>

                <hr />

                <PhotoComment
                  comments={photoBySlug.comments}
                  photoId={photoBySlug.id}
                  addComment={this.addComment}
                  receiver={photoBySlug.user.id}
                  loadingComment={loadingComment}
                />
              </div>

              <hr className="md:hidden py-2" />
              <div className="w-full">
                <div className="relative flex items-center w-full">
                  <Link href={`/fotograaf/${photoBySlug.user.slug}`}>
                    <a className="top-0 left-0 h-full w-full absolute"></a>
                  </Link>
                  <div className="mb-2 mr-4">
                    <UserProfilePicture profile={photoBySlug.user} />
                  </div>
                  <h1 className="font-bold text-xl leading-tight">
                    {photoBySlug.user.firstname
                      ? photoBySlug.user.firstname + " " + photoBySlug.user.lastname
                      : photoBySlug.user.username}
                  </h1>
                </div>

                <div className="my-4">
                  {photoBySlug.camera && photoBySlug.camera != 'Onbekend' && photoBySlug.camera != 'Unavailable' || ownPhoto ? (
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <IoCameraOutline className="text-2xl" />
                      </div>
                      <div>{photoBySlug.camera &&
                        photoBySlug.camera != 'Unavailable'
                        && photoBySlug.camera != 'Onbekend' ?
                        <div>{photoBySlug.camera} {ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link>}</div> :
                        (ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}>
                          <a className=" flex  items-center">
                            <div className=" mr-2">
                              Informatie aanvullen
                            </div>
                            <div className="">
                              <BsPencil />
                            </div>
                          </a>
                        </Link>)}</div>
                    </div>
                  ) : ""}
                  <div className="flex items-center">
                    <div className="mr-2">
                      <GoSettings className="text-2xl" />
                    </div>
                    {(ownPhoto || photoBySlug.focalLength ||
                      photoBySlug.aperture ||
                      photoBySlug.iso ||
                      photoBySlug.shutterspeed) &&
                      (photoBySlug.focalLength != 'Onbekend' &&
                        photoBySlug.focalLength != 'Unavailable' &&
                        photoBySlug.aperture != 'Onbekend' &&
                        photoBySlug.aperture != 'Unavailable' && photoBySlug.iso != 'Onbekend' && photoBySlug.iso != 'Unavailable' && photoBySlug.shutterspeed != 'Onbekend' && photoBySlug.shutterspeed != 'Unavailable') ? (
                      <div className="flex items-center">
                        {photoBySlug.focalLength && photoBySlug.focalLength != 'Onbekend' && (
                          <div className="mr-2">{photoBySlug.focalLength}</div>
                        )}
                        {photoBySlug.aperture && photoBySlug.aperture != 'Onbekend' && (
                          <div className="mr-2">{photoBySlug.aperture.includes('f') ? photoBySlug.aperture : 'f/' + photoBySlug.aperture}</div>
                        )}
                        {photoBySlug.iso && photoBySlug.iso != 'Onbekend' && (
                          <div className="mr-2">{photoBySlug.iso.toLowerCase().includes('iso') ? photoBySlug.iso : 'ISO ' + photoBySlug.iso}</div>
                        )}
                        {photoBySlug.shutterspeed && photoBySlug.shutterspeed != 'Onbekend' && (
                          <div className="mr-2">{photoBySlug.shutterspeed.includes('s') ? photoBySlug.shutterspeed : photoBySlug.shutterspeed + 's'}</div>
                        )}
                        {ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link>}
                      </div>
                    ) : (ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}>
                      <a className=" flex  items-center">
                        <div className=" mr-2">
                          Informatie aanvullen
                        </div>
                        <div className="">
                          <BsPencil />
                        </div>
                      </a>
                    </Link>)}
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="mr-2">
                    <FiCalendar className="text-2xl" />
                  </div>

                  <div>
                    {photoBySlug.date ?
                      <div>{this.dateReadable(photoBySlug.date)} {ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link>}</div>
                      : (ownPhoto && <Link href={`/foto/bewerken/${photoBySlug.slug}`}>
                        <a className=" flex  items-center">
                          <div className=" mr-2">
                            Informatie aanvullen
                          </div>
                          <div className="">
                            <BsPencil />
                          </div>
                        </a>
                      </Link>)}
                  </div>
                </div>

                <Link href={`/fotolocatie/${photoBySlug.location.slug}`}>
                  <div className="flex items-center mb-3 cursor-pointer">
                    <div className="mr-2">
                      <GrLocation className="text-2xl" />
                    </div>
                    <h2>{photoBySlug.location.title}</h2>
                  </div>
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

                    <Link href={`/fotolocatie/${photoBySlug.location.slug}`}>
                      <a className="text-blue-400 font-bold text-large mt-2 hover:text-blue-500 hover:underline cursor-pointer">
                        Bekijk fotolocatie »
                      </a>
                    </Link>
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
      </div >
    );
  }
}

// export async function getStaticPaths() {
//   // build the graphql query
//   const query = `
//         query photoBySlug{
//             photos {
//                 slug
//             }
//         }`;

//   const vars = {};
//   const result = await graphQLFetch(query, vars, true);

//   const paths = result.photos.map((photo) => ({
//     params: { slug: photo.slug.toString() },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
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
                    firstname
                    lastname
                    profilePicture {
                        url
                    }
                }
            }
        }`;

  const { slug } = params;

  const result = await graphQLFetch(query, { slug }, true);
  // console.log("result", result);

  return {
    props: {
      photoBySlug: result.photoBySlug,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 60, // In seconds
  };
}
