import React from "react";
import { FaUserSecret } from "react-icons/fa";

const UserProfilePicture = ({ profile, size = 16 }) => {
  return profile.profilePicture !== null &&
    profile.profilePicture !== undefined ? (
    <div
      id="imagePreview"
      className={`relative h-${size} w-${size} sm:h-${size + 4} sm:w-${
        size + 4
      } overflow-hidden rounded-full`}
    >
      <img
        className={`border w-auto h-${size} sm:h-${size + 4} sm:w-${
          size + 4
        } rounded-full mb-2`}
        src={profile.profilePicture.url}
      ></img>
    </div>
  ) : (
    <div
      id="imagePreview"
      className={`relative h-${size} w-${size} sm:h-${size + 4} sm:w-${
        size + 4
      } overflow-hidden rounded-full`}
    >
      <div
        className={`fill-current h-${size} w-${size} sm:h-${size + 4} sm:w-${
          size + 4
        } mr-4 mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center`}
      >
        <FaUserSecret className="text-2xl" />
      </div>
    </div>
  );
};

export default UserProfilePicture;
