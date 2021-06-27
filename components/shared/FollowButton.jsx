import React, { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FollowButton = ({ follow, updateFollow, followId }) => {
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(follow);

  const onBtnClick = () => {
    console.log("clicked");
    followed ? updateFollow(followId) : updateFollow(followId);
    setFollowed(!followed);
  };

  useEffect(() => {
    setFollowed(follow);
  }, [follow]);

  const followIcon = !followed ? <FiPlus /> : <FiMinus />;

  const followClass = !followed
    ? `cursor-pointer my-1 rounded w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 text-xs flex justify-center items-center followProfile`
    : `cursor-pointer my-1 rounded w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-2 py-2 text-xs flex justify-center items-center followProfile`;

  return (
    <div onClick={loading ? () => {} : onBtnClick} className={followClass}>
      {followIcon}
      {!followed ? ` Volgen` : ` Ontvolgen`}
    </div>
  );
};

export default FollowButton;
