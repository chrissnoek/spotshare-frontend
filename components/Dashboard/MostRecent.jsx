import React, { useState, useEffect } from "react";
//import useConstructor from "../ConstructorHook.jsx";
import graphQLFetch from "../../graphQLFetch.js";
import SocialCard from "./SocialCard.jsx";

const MostRecent = () => {
  const [recentPhotos, setRecentPhotos] = useState();

  useEffect(() => {
    getMostRecent();
  }, []);

  const getMostRecent = async () => {
    const _recentPhotos = await MostRecent.fetchData();
    setRecentPhotos(_recentPhotos);
  };


  return (
    <div className="mb-10">
      <h2>Meest Recent</h2>
      <div className="">
        {recentPhotos &&
          recentPhotos.photos.map((photo) => (
            <SocialCard key={photo.id} photo={photo} />
          ))}
      </div>
    </div>
  );
};

export default MostRecent;

MostRecent.fetchData = async (match, search, showError) => {
  // build the graphql query
  const query = `query recentPhotos{
    photos(limit: 6, sort:"createdAt:desc", where: {user_null:false}) {
      createdAt
      title
      id
      desc
      photo {
          url
          formats
      }

      comments {
        body
        user {
          profilePicture {
            url
          }
          slug
          username 
        }
      }
      slug
      date
      brand

      shutterspeed
      iso
      aperture
      camera
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

  const vars = {};
  const result = await graphQLFetch(query, vars, true);
  return result;
};
