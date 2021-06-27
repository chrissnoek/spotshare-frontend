import React from "react";
import UserProfilePicture from "../shared/UserProfilePicture.jsx";
//import Img from "react-cool-img";

const SocialCard = ({ photo }) => {
  return (
    <div>
      <div className="flex items-center my-4">
        <div className="mr-2">
          <UserProfilePicture profile={photo.user} size={8} />
        </div>
        <div>
          <div className="font-bold">
            {photo.user && photo.user.firstname}{" "}
            {photo.user && photo.user.lastname}
          </div>
          <div className="text-xs text-gray-500">
            {photo.createdAt.toLocaleString()}
          </div>
        </div>
      </div>
      <img
        className={`rounded block max-w-none w-full h-64 object-cover`}
        style={{ backgroundColor: "grey", width: "480", height: "320" }}
        src={photo.photo[0].url.replace(
          /-original|-watermark|-thumbnail/gi,
          "-small"
        )}
        alt={photo.title}
      />
    </div>
  );
};

export default SocialCard;
