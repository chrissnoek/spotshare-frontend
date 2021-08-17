import React from "react";
import UserProfilePicture from "../shared/UserProfilePicture.jsx";
import Link from "next/link";
import moment from 'moment';
import 'moment/locale/nl';

const SocialCard = ({ photo }) => {
  let imageUrl = '';

  if (photo.photo[0].formats) {
    if (photo.photo[0].formats.medium) {
      imageUrl = photo.photo[0].formats.medium.url;
    } else if (photo.photo[0].formats.large) {
      imageUrl = photo.photo[0].formats.large.url;
    }
  } else {
    imageUrl = photo.photo[0].url;
  }

  // console.log(photo);
  moment.locale('nl');
  return (
    <div className="relative mb-8">
      <div className="flex items-center my-4 relative">
        <Link href={`/fotograaf/${photo.user.username}`}>
          <a className="top-0 left-0 h-full w-full absolute z-10"></a>
        </Link>
        <div className="mr-2">
          <UserProfilePicture profile={photo.user} size={8} />
        </div>
        <div>
          <div className="font-bold">
            {photo.user.firstname ? photo.user.firstname + " " + photo.user.lastname : photo.user.username}
          </div>
          <div className="text-xs text-gray-500">
            {moment(photo.createdAt).fromNow()}
          </div>
        </div>
      </div>
      <Link href={`/foto/${photo.slug}`}>
        <a className="top-0 left-0 h-full w-full absolute "></a>
      </Link>
      <img
        className={`rounded block max-w-none w-full object-contain`}
        style={{ backgroundColor: "black", width: "100%", maxHeight: "700px" }}
        src={imageUrl}
        alt={photo.title}
      />
    </div>
  );
};

export default SocialCard;
