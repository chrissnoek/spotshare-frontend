import React, { useState } from "react";
import { FaHeart, FaSpinner } from "react-icons/fa";

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

  const heartClass = !liked
    ? `inline-block bg-white rounded py-2 px-3 h-8 text-gray-500 hover:text-red-500`
    : `inline-block bg-white rounded py-2 px-3 h-8 text-red-500`;

  return (
    <div
      className="revealTooltip mb-2 flex pointer justify-end items-center"
      onClick={loading ? () => {} : onBtnClick}
    >
      <div className="hidden inline-block bg-white rounded py-1 px-3 h-8">
        {!liked ? addTitle : removeTitle}
      </div>
      <div className={heartClass}>{loading ? <FaSpinner /> : <FaHeart />}</div>
    </div>
  );
};

export default favButton;
