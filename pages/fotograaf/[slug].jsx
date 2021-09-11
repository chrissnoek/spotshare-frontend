import React, { useState, useEffect } from "react";
import graphQLFetch from "../../graphQLFetch.js";
import { MdEdit } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import { userContext } from "../../services/userContext.js";
import PhotoView from "../../components/shared/PhotoView";
import Link from "next/link";
import FollowButton from "../../components/shared/FollowButton.jsx";
import UserProfilePicture from "../../components/shared/UserProfilePicture.jsx";
import CreateNotification from "../../components/shared/CreateNotification.jsx";
import LocationCard from "../../components/shared/LocationCard.jsx";
import Head from "next/head";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import LocationHashtag from "../../components/shared/LocationHashtag.jsx";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";

const UserProfile = ({ profile: _profile }) => {
  const [profile, setProfile] = useState(_profile);
  const router = useRouter();

  useEffect(() => {
    setProfile(_profile);
  }, [_profile]);

  const updateFollow = async (followId) => {
    //console.log(followId);
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            followers {
              id
            }
          }
        }
      }`;

    let profileFollowersArray = profile.followers.map(
      (following) => following.id
    );

    //console.log("before adjusting", profileFollowersArray);
    let action;
    // if the id that is being followed is not already in the array, add it
    if (!profileFollowersArray.includes(followId)) {
      profileFollowersArray.push(followId);
      action = "add";
    } else if (profileFollowersArray.includes(followId)) {
      // followId is in array, so remove it from array
      const index = profileFollowersArray.indexOf(followId);
      if (index > -1) {
        profileFollowersArray.splice(index, 1);
      }
      action = "remove";
    }

    //console.log("after adjusting", profileFollowersArray);

    const variables = {
      input: {
        where: {
          id: profile.id,
        },
        data: {
          followers: profileFollowersArray,
        },
      },
    };

    let prevProfile = { ...profile };
    let _profile = { ...profile };

    let newFollowArray = profileFollowersArray.map((following) => {
      return { id: following };
    });

    _profile.followers = newFollowArray;
    setProfile(_profile);

    const data = await graphQLFetch(query, variables, true, true);

    if (data) {
      if (data.errors) {
        // console.log("an error happened");
        setProfile(prevProfile);
      } else {
        if (action === "add") {
          await CreateNotification(followId, profile.id, "follow");
        }
      }
    }
  };

  const deletePhoto = async (index) => {
    const query = `mutation photoDelete($input:deletePhotoInput) {
      deletePhoto(input: $input) {
        photo {
          id
        }
      }
    }`;

    const prevProfile = { ...profile };

    const { photos } = profile;
    const newList = [...photos];
    newList.splice(index, 1);
    const _profile = { ...profile };
    _profile.photos = newList.reverse();
    setProfile(_profile);

    // get the id of the photo to be deleted
    const { id } = photos[index];

    const variables = {
      input: {
        where: {
          id,
        },
      },
    };

    // execute the query
    const data = await graphQLFetch(query, variables, true, true);

    if (data) {
      if (data.errors) {
        // console.log("an error happened");
        setProfile(prevProfile);
      }
    }
  };

  return (
    <userContext.Consumer>
      {(value) => {
        //console.log("value", value);
        if (value.user) {
          return (
            <UserProfileComponent
              curUser={value.user}
              profile={profile}
              updateFollow={updateFollow}
              deletePhoto={deletePhoto}
              router={router}
            />
          );
        } else {
          return (
            <UserProfileComponent
              curUser={null}
              profile={profile}
              updateFollow={updateFollow}
              deletePhoto={deletePhoto}
              router={router}
            />
          );
        }
      }}
    </userContext.Consumer>
  );
};

// export async function getStaticPaths() {
//   // build the graphql query
//   const query = `query profile {
//     users {
//       username
//     }
//   }`;

//   const vars = {};
//   const result = await graphQLFetch(query, vars, true);

//   const paths = result.users.map((profile) => ({
//     params: { username: profile.username.toString() },
//   }));

//   return { paths, fallback: false };
// }
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps({ params }) {
  // console.log(params);
  const query = `query profile($slug: String!) {
    users( where: { slug: $slug } ) {
      username
      profilePicture {
        url
      }
      email
      id
      slug
      firstname
      lastname
      location
      website
      fb_page
      insta_page
      followers{
        id
      }
      followings {
        id
      }
      favouriteLocations {
        id
        title
        slug
        location_categories {
          id
          label
        }
        photos {
          likes
          photo {
            url
            formats
            
          }
        }
      }
      photos(sort:"createdAt:desc") {
        likes
        id
        title
        slug
        location {
          longitude
          latitude
          id
          title
          slug
          photos {
            likes
            id
            title
            slug
            photo {
              url
              formats
            }
          }
        }
        photo {
          id
          url
          formats
        }
      }
    }
  }`;

  const { slug } = params;

  const result = await graphQLFetch(query, { slug }, true);

  return {
    props: {
      profile: result.users[0],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 60, // In seconds
  };
}

const UserProfileComponent = (props) => {
  const [bounds, setBounds] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(false);
  const [locIcon, setLocIcon] = useState(false);
  const [visitedIcon, setVisIcon] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [active, selectActive] = useState();

  const { curUser, profile, updateFollow, deletePhoto, router } = props;
  if (profile === null) {
    // console.log("return null from render");
    return null;
  }

  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  //console.log("curUser", props);

  const followCount = profile.followers.length;
  // console.log(
  //   "userProfileComponent rendered again, followCount: ",
  //   followCount,
  //   profile
  // );
  const filterResult =
    curUser &&
    profile.followers.filter((followers) => followers.id === curUser.id);
  //console.log(filterResult);
  const followsUser = curUser
    ? profile.followers.filter((followers) => followers.id === curUser.id)
      .length > 0
    : 0;

  let numberOfLikes = 0;
  if (profile.photos.length > 0) {
    for (let i = 0; i < profile.photos.length; i++) {
      numberOfLikes = numberOfLikes + profile.photos[i].likes;
    }
  }
  console.log(profile);

  const {
    query: { tab }
  } = router;

  const isTabOne = tab === "fotos" || tab == null;
  const isTabTwo = tab === "favoriete-locaties";
  const isTabThree = tab === "bezochte-locaties";

  useEffect(() => {
    if (tab === "bezochte-locaties") {
      console.log({ profile });
      let _allLocations = profile.photos.map((photo) => photo.location);

      console.log({ _allLocations });

      _allLocations = _allLocations.filter((location, index, self) =>
        index === self.findIndex((l) => (
          l.id === location.id
        ))
      );

      console.log({ _allLocations });

      setAllLocations(_allLocations);
      loadMap(_allLocations);
    }
  }, [tab]);


  const loadMap = (_allLocations) => {
    // loading leaflet in componentDidMount because it doenst support SSR
    const L = require("leaflet");
    console.log({ _allLocations });

    delete L.Icon.Default.prototype._getIconUrl;

    const _hoverIcon = new L.Icon({
      iconUrl: "/images/userMarker.svg",
      iconRetinaUrl: "/images/userMarker.svg",

      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/images/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id,
    });

    const _locIcon = new L.Icon({
      iconUrl: "/images/locationMarker.svg",
      iconRetinaUrl: "/images/locationMarker.svg",
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/images/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id,
    });

    const _visIcon = new L.Icon({
      iconUrl: "/images/visitedMarker.svg",
      iconRetinaUrl: "/images/visitedMarker.svg",
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/images/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
      className: "little-blue-dot-" + location.id,
    });

    setHoverIcon(_hoverIcon);
    setLocIcon(_locIcon);
    setVisIcon(_visIcon);

    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    //const bounds = Leaflet.latLngBounds([position, position2]);
    const _bounds = L.latLngBounds(
      _allLocations.map((location) => {
        return [location.latitude, location.longitude];
      })
    );
    console.log(_bounds);
    setBounds(_bounds);

    if (sessionStorage.getItem("visitedLocations")) {
      setVisitedLocations(
        JSON.parse(sessionStorage.getItem("visitedLocations"))
      );
    }

    setShowMap(true);
  };

  const goToLocation = (slug, id) => {
    let data = [];
    if (sessionStorage.getItem("visitedLocations")) {
      data = JSON.parse(sessionStorage.getItem("visitedLocations"));
    }
    if (data.indexOf(id) === -1) {
      data.push(id);
    }
    sessionStorage.setItem("visitedLocations", JSON.stringify(data));

    router.push(`/fotolocatie/${slug}`);
  };

  const getPopupImage = (location) => {
    console.log(location);
    const featuredPhoto = location.photos
      .sort((a, b) => b.likes - a.likes)[0];
    let popupImage = '';
    if (featuredPhoto.photo[0].formats) {
      if (featuredPhoto.photo[0].formats.thumbnail) {
        popupImage = featuredPhoto.photo[0].formats.thumbnail.url;
      } else if (featuredPhoto.photo[0].formats.small) {
        popupImage = featuredPhoto.photo[0].formats.small.url;
      } else if (featuredPhoto.photo[0].formats.medium) {
        popupImage = featuredPhoto.photo[0].formats.medium.url;
      } else if (featuredPhoto.photo[0].formats.large) {
        popupImage = featuredPhoto.photo[0].formats.large.url;
      } else {
        popupImage = featuredPhoto.photo[0].url;
      }
    } else {
      popupImage = featuredPhoto.photo[0].url;
    }
    return popupImage;
  }

  return (
    <div className="p-6">
      <Head>

        {/* <!-- Primary Meta Tags --> */}
        <title key="title">Profiel van fotograaf {profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} | Spotshare</title>
        <meta
          name="title"
          key="meta_title"
          content={`Profiel van fotograaf ${profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} | Spotshare`}
        />
        <meta
          name="description"
          key="meta_desc"
          content={`Bekijk de foto's van ${profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} op Spotshare!`}
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta
          property="og:title"
          key="og_title"
          content={`Profiel van fotograaf ${profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} | Spotshare`}
        />
        <meta
          property="og:description"
          key="og_desc"
          content={`Bekijk de foto's van ${profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} op Spotshare!`}
        />

        {profile.photos[0] &&
          <meta property="og:image"
            key="og_img" content={profile.photos[0] ? profile.photos[0].photo[0].url : ""} />}

        {/* <!-- Twitter --> */}
        <meta
          property="twitter:title"
          key="twitter_title"
          content={`Profiel van fotograaf ${profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} | Spotshare`}
        />
        <meta
          property="twitter:description"
          key="twitter_desc"
          content={`Bekijk de foto's van ${profile.firstname ? profile.firstname + " " + profile.lastname : profile.username} op Spotshare!`}
        />
        {profile.photos[0] &&
          <meta property="twitter:image"
            key="twitter_img" content={profile.photos[0] ? profile.photos[0].photo[0].url : ""} />}
      </Head>
      <div className="container">
        <div className="sm:flex sm:items-center">
          <div className="block sm:flex sm:items-center sm:w-full">
            <div className="mx-auto sm:mx-0 mb-2 sm:mr-4">
              <UserProfilePicture profile={profile} classNames={'mx-auto'} />
            </div>
            <div className="sm:w-full">
              <h1 className="font-bold text-xl leading-tight text-center sm:text-left">
                {profile.firstname
                  ? profile.firstname + " " + profile.lastname
                  : profile.username}
              </h1>
              <div className="flex mb-6 mt-2 justify-center sm:mb-0 sm:justify-start">
                {profile.location && <p className="mr-4 flex items-center text-gray-400 text-sm text-center justify-center sm:justify-start">
                  <TiLocation />
                  &nbsp;
                  {profile.location}
                </p>}
                {profile.website && <a href={profile.website} className="mr-4 flex items-center text-gray-400 hover:text-gray-600 hover:underline text-sm text-center justify-center sm:justify-start" target="_blank" rel="nofollow noopener">
                  <BiWorld />
                  &nbsp;
                  website
                </a>}
                {profile.fb_page && <a href={profile.fb_page.includes('http') ? profile.fb_page : (profile.fb_page.includes('www.') ? 'http://' + profile.fb_page : 'https://www.facebook.com/' + profile.fb_page)} className="mr-4 flex items-center text-gray-400 hover:text-gray-600 hover:underline text-sm text-center justify-center sm:justify-start" target="_blank" rel="nofollow noopener">
                  <FaFacebook />
                  &nbsp;
                  Facebook
                </a>}
                {profile.insta_page && <a href={profile.insta_page.includes('http') ? profile.insta_page : (profile.insta_page.includes('www.') ? 'http://' + profile.insta_page : 'https://www.instagram.com/' + profile.insta_page)} className="mr-4 flex items-center text-gray-400 hover:text-gray-600 hover:underline text-sm text-center justify-center sm:justify-start" target="_blank" rel="nofollow noopener">
                  <FaInstagram />
                  &nbsp;
                  Instagram
                </a>}

              </div>

              <div className="hidden sm:block">
                <div className="flex justify-between sm:justify-start mt-2 w-full">
                  <p className="mr-2 text-center sm:mr-3">
                    <span className="block sm:inline-block font-bold text-sm sm:mr-1">
                      {followCount}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {followCount === 1 ? "volger" : "volgers"}
                    </span>
                  </p>
                  <p className="mr-2 text-center sm:mr-3">
                    <span className="block sm:inline-block font-bold text-sm sm:mr-1">
                      {profile.followings.length}
                    </span>
                    <span className="text-gray-500 text-sm">volgend</span>
                  </p>
                  <p className="mr-2 text-center sm:mr-3">
                    <span className="block sm:inline-block font-bold text-sm sm:mr-1">
                      {numberOfLikes}
                    </span>
                    <span className="text-gray-500 text-sm">likes</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!isServer && curUser && curUser.id !== profile.id && (
            <FollowButton
              follow={followsUser}
              updateFollow={updateFollow}
              followId={curUser.id}
            />
          )}
          {!isServer && curUser && curUser.id === profile.id && (
            <Link href={`/profiel/bewerken/${profile.slug}`}>
              <a className="ml-auto my-1 rounded bg-blue-500 hover:bg-blue-600 text-white p-1 sm:p-3 text-xl flex justify-center items-center editProfile">
                <MdEdit />
              </a>
            </Link>
          )}

          <div className="sm:hidden">
            <div className="flex justify-between mt-2">
              <p className="mr-2 text-center">
                <span className="block font-bold text-sm">{followCount}</span>
                <span className="text-gray-500 text-sm">
                  {followCount === 1 ? "volger" : "volgers"}
                </span>
              </p>
              <p className="mr-2 text-center">
                <span className="block font-bold text-sm">
                  {profile.followings.length}
                </span>
                <span className="text-gray-500 text-sm">volgend</span>
              </p>
              <p className="mr-2 text-center">
                <span className="block font-bold text-sm">{numberOfLikes}</span>
                <span className="text-gray-500 text-sm">likes</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex">
          <Link href={{ pathname: `/fotograaf/${profile.slug}`, query: { tab: "fotos" } }}>
            <a className={`inline-block py-2 px-3 mr-3 rounded hover:bg-gray-100 text-gray-500 ${isTabOne ? 'bg-green-200 hover:bg-green-200 text-green-600 font-bold' : ''}`}>Foto's</a>
          </Link>
          <Link href={{ pathname: `/fotograaf/${profile.slug}`, query: { tab: "favoriete-locaties" } }}>
            <a className={`inline-block py-2 px-3 mr-3 rounded hover:bg-gray-100 text-gray-500 ${isTabTwo ? 'bg-green-200 hover:bg-green-200 text-green-600 font-bold' : ''}`}>Favoriete locaties</a>
          </Link>
          {profile.photos.length > 0 && 
          <Link href={{ pathname: `/fotograaf/${profile.slug}`, query: { tab: "bezochte-locaties" } }}>
            <a className={`inline-block py-2 px-3 rounded hover:bg-gray-100 text-gray-500 ${isTabThree ? 'bg-green-200 hover:bg-green-200 text-green-600 font-bold' : ''}`}>Bezochte locaties</a>
          </Link>}
        </div>
        <hr className="my-3" />
        {isTabOne && <><h2 className="my-3">Foto's</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.photos.map((photo, index) => (
              <PhotoView
                key={photo.id}
                index={index}
                deletePhoto={
                  !isServer && curUser && curUser.id === profile.id
                    ? deletePhoto
                    : null
                }
                photo={photo}
              />
            ))}
          </div></>}
        {isTabTwo && <><h2 id="fav" className="my-3">
          Favoriete locaties
        </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profile.favouriteLocations.length > 0 && profile.favouriteLocations.reverse().map((location) => (
              <LocationView key={location.id} location={location} />
            ))}
          </div></>}
        {isTabThree && <><h2 id="fav" className="my-3">
          Bezochte locaties
        </h2>

          {showMap && (<Map
            className="map"
            center={[52.0841037, 4.9424092]}
            zoom={13}
            bounds={bounds || null}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {allLocations.map((location) => {
              return (
                <Marker
                  position={[location.latitude, location.longitude]}
                  key={location.id}
                  onMouseOver={() => {
                    console.log("check", active, location.id);
                    selectActive(location.id);
                  }}
                  onMouseOut={() => {
                    selectActive("");
                  }}
                  className="hover:translate-x-2 bg-black border border-red-500"
                  icon={
                    active === location.id
                      ? hoverIcon
                      : visitedLocations.indexOf(location.id) !== -1
                        ? visitedIcon
                        : locIcon
                  }
                >
                  <Popup autoPan={false}>
                    <span className="font-bold text-large block mb-2">
                      {location.title}
                    </span>
                    <Image
                      className={` block max-w-none w-full h-18 object-cover`}
                      src={getPopupImage(location)}
                      alt={`Bekijk locatie ${location.title}`}
                      width={100}
                      height={76}
                    />
                    <div
                      className="text-blue-400 font-bold text-large mt-2 hover:text-blue-500 hover:underline cursor-pointer"
                      onClick={() => {
                        goToLocation(location.slug, location.id);
                      }}
                    >
                      Bekijk fotolocatie »
                    </div>
                  </Popup>
                </Marker>)
            })}
          </Map>)}
        </>}
      </div>
    </div >
  );
};

export default UserProfile;

const LocationView = ({ location }) => {

  console.log(location);

  const featuredPhoto = location.photos
    .sort((a, b) => b.likes - a.likes)[0]
    .photo[0];

  let imageUrl = '';

  if (featuredPhoto.formats) {
    if (featuredPhoto.formats.medium) {
      imageUrl = featuredPhoto.formats.medium.url;
    } else if (featuredPhoto.formats.large) {
      imageUrl = featuredPhoto.formats.large.url;
    } else {
      imageUrl = featuredPhoto.url;
    }
  } else {
    imageUrl = featuredPhoto.url;
  }

  return (
    <div className="rounded overflow-hidden relative">
      <Link href={`/fotolocatie/${location.slug}`}>
        <a className="absolute w-full h-full top-0 left-0 z-10"></a>
      </Link>
      <div className="relative">
        <div className="w-full h-36 md:w-26 h-26 mr-4 relative">
          <Image
            className={`object-cover w-full`}
            src={imageUrl}
            alt={`Bekijk locatie ${location.title}`}
            layout="fill"
            object="cover"
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0" style={{ background: "linear-gradient(0deg, #00000088 30%, #ffffff44 100%" }}></div>
        <div className="absolute ml-3 mb-2 bottom-0 left-0 w-full">
          <div>
            {[location.location_categories[0], location.location_categories[1], location.location_categories[2]].map((category) => (typeof category != "undefined" &&
              <LocationHashtag key={category.id} category={category} />
            ))}</div>
          <h3 className=" text-white ">{location.title}</h3>
        </div>
      </div>
    </div>
  )
}