import React, { Fragment, useState, useEffect } from "react";
import { FaUserSecret } from "react-icons/fa";
import UserProfilePicture from "../shared/UserProfilePicture.jsx";
import ReplyBox from "./ReplyBox.jsx";

export const Comment = ({ item, photoId, addComment, receiver }) => {
  // console.log(item);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const replyClick = () => {
    setShowReplyBox(!showReplyBox);
  };

  const closeReplyBox = () => {
    setShowReplyBox(false);
  };

  return (
    <Fragment>
      <div className="comment mb-2">
        <div>
          <div className="flex">
            <div className="mr-2">
              <UserProfilePicture profile={item.user} size={8} />
            </div>
            <div className="rounded px-3 py-2 bg-gray-100">
              <p>{item.body}</p>
              <span
                className="block text-blue-500 text-xs cursor-pointer"
                onClick={replyClick}
              >
                Beantwoorden
              </span>
            </div>
          </div>
          {showReplyBox ? (
            <ReplyBox
              replyTo={item.id}
              photoId={photoId}
              addComment={addComment}
              closeBoxHandler={closeReplyBox}
              receiver={receiver}
            />
          ) : null}
        </div>
        {item.children && item.children.length > 0 && (
          <div className="ml-10 mt-2">
            {item.children.map((item, idx) => {
              return (
                <Comment
                  item={item}
                  key={idx}
                  photoId={photoId}
                  addComment={addComment}
                  receiver={receiver}
                />
              );
            })}
          </div>
        )}
      </div>
    </Fragment>
  );
};
