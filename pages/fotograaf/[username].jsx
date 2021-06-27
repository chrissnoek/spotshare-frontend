import React, { useState, useEffect } from "react";
import graphQLFetch from "../../graphQLFetch.js";
import { MdEdit } from "react-icons/md";
import { TiLocation } from "react-icons/ti";
import { userContext } from "../../services/userContext.js";
import PhotoView from "../../components/shared/PhotoView";
import Link from "next/link";
import FollowButton from "../../components/shared/FollowButton.jsx";
import UserProfilePicture from "../../components/shared/UserProfilePicture.jsx";
import CreateNotification from "../../components/shared/CreateNotification.jsx";
import LocationCard from "../../components/shared/LocationCard.jsx";

const UserProfile = ({ profile: _profile }) => {
  const [profile, setProfile] = useState(_profile);

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
        console.log("an error happened");
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
    _profile.photos = newList;
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
        console.log("an error happened");
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
            />
          );
        } else {
          return (
            <UserProfileComponent
              curUser={null}
              profile={profile}
              updateFollow={updateFollow}
              deletePhoto={deletePhoto}
            />
          );
        }
      }}
    </userContext.Consumer>
  );
};

export async function getStaticPaths() {
  // build the graphql query
  const query = `query profile {
    users {
      username
    }
  }`;

  const vars = {};
  const result = await graphQLFetch(query, vars, true);

  const paths = result.users.map((profile) => ({
    params: { username: profile.username.toString() },
  }));

  return { paths, fallback: false };
}
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }) {
  console.log(params);
  const query = `query profile($username: String!) {
    users( where: { username: $username } ) {
      username
      profilePicture {
        url
      }
      email
      id
      slug
      location
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
            
          }
        }
      }
      photos {
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
        }
        photo {
          id
          url
        }
      }
    }
  }`;

  const { username } = params;

  const result = await graphQLFetch(query, { username }, true);

  return {
    props: {
      profile: result.users[0],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 60, // In seconds
  };
}

const UserProfileComponent = (props) => {
  const { curUser, profile, updateFollow, deletePhoto } = props;
  if (profile === null) {
    console.log("return null from render");
    return null;
  }

  const [isServer, setIsServer] = useState(true);

  useEffect(() => {
    setIsServer(false);
  }, []);

  //console.log("curUser", props);

  const followCount = profile.followers.length;
  console.log(
    "userProfileComponent rendered again, followCount: ",
    followCount,
    profile
  );
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

  return (
    <div className="p-6">
      <div className="container">
        <div className="sm:flex sm:items-center">
          <div className="block sm:flex sm:items-center sm:w-full">
            <div className="mx-auto sm:mx-0 mb-2 sm:mr-4">
              <UserProfilePicture profile={profile} />
            </div>
            <div className="sm:w-full">
              <h1 className="font-bold text-xl leading-tight text-center sm:text-left">
                {profile.username}
              </h1>
              <div className="">
                <p className="flex items-center text-gray-400 text-sm text-center justify-center sm:justify-start">
                  <TiLocation />
                  &nbsp;
                  {profile.location}
                </p>
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
        <h2 className="my-3">Foto's</h2>
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
        </div>
        <hr className="my-3" />
        <h2 id="fav" className="my-3">
          Favoriete locaties
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profile.favouriteLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
