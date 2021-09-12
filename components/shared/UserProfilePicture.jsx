import React from "react";
import { FaUserSecret } from "react-icons/fa";

const UserProfilePicture = ({ profile, size = 16, classNames }) => {
  return profile.profilePicture !== null &&
    profile.profilePicture !== undefined ? (
    <div
      id="imagePreview"
      className={classNames + ` relative h-${size} w-${size} sm:h-${size + 4} sm:w-${size + 4
        } overflow-hidden rounded-full`}
    >
      <img
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          objectFit: 'cover',
          minHeight: '100%',
          minWidth: '100%'
        }}
        src={profile.profilePicture.url}
      ></img>
    </div>
  ) : (
    <div
      id="imagePreview"
      className={`relative h-${size} w-${size} sm:h-${size + 4} sm:w-${size + 4
        } overflow-hidden rounded-full`}
    >
      <div
        className={classNames + `fill-current h-${size} w-${size} sm:h-${size + 4} sm:w-${size + 4
          } mr-4 mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center p-2`}
      >
        <FaUserSecret className="text-2xl" />
      </div>
    </div>
  );
};

export default UserProfilePicture;
