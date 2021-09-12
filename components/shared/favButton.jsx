import React, { useState } from "react";
import { FaBookmark, FaSpinner } from "react-icons/fa";

const favButton = ({
  favourite,
  updateFav,
  user,
  likedId,
  addTitle,
  removeTitle,
  receiver,
}) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(favourite);

  const onBtnClick = () => {
    liked
      ? updateFav(user, likedId, "remove", receiver)
      : updateFav(user, likedId, "add", receiver);
    setLiked(!liked);
  };


  return (
    <div
      className={`text-white py-2 px-3 rounded-full flex items-center pointer cursor-pointer ${liked ? 'bg-gray-500 hover:bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-600'}`}
      onClick={loading ? () => {} : onBtnClick}
    >
      <div className="mr-2">{loading ? <FaSpinner /> : <FaBookmark />}</div>
      <div>{liked ? 'Verwijderen' : 'Opslaan'}</div>
    </div>
  );
};

export default favButton;
