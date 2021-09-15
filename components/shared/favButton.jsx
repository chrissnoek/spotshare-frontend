import React, { useState } from "react";
import { FaBookmark, FaHeart, FaSpinner } from "react-icons/fa";

const FavButton = ({
  favourite,
  updateFav,
  user,
  likedId,
  addTitle,
  removeTitle,
  receiver,
  type,
  count
}) => {
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(favourite);

  const onBtnClick = () => {
    liked
      ? updateFav(user, likedId, "remove", receiver)
      : updateFav(user, likedId, "add", receiver);
    setLiked(!liked);
  };

  let icon = <FaBookmark/>;
  let className = `text-white py-2 px-3 rounded-full flex items-center pointer cursor-pointer ${liked ? 'bg-gray-500 hover:bg-gray-600' : 'bg-yellow-500 hover:bg-yellow-600'}`;


  if(type === 'photo') {
    icon = <FaHeart/>;
    if(icon) {
      className = `cursor-pointer flex items-center text-2xl ${liked ? 'text-red-500 group-hover:text-red-600' : 'text-gray-500 group-hover:text-red-500'}`
    } else {
      className = `text-white py-2 px-3 rounded-full flex items-center pointer cursor-pointer ${liked ? 'bg-gray-500 hover:bg-gray-600' : 'bg-red-500 hover:bg-red-600'}`
    }
  }


  return (
    <div
      className={`group ${className}`}
      onClick={loading ? () => {} : onBtnClick}
    >
      <div className={`${icon && className} mr-2`}>{loading ? <FaSpinner /> : icon}</div>
      <div>{!icon && (liked ? 'Verwijderen' : 'Opslaan')}</div>
      <div>{icon && count}</div>
    </div>
  );
};

export default FavButton;
