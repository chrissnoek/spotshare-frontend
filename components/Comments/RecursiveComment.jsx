import React, { Fragment, useState, useEffect } from "react";
import { FaUserSecret } from "react-icons/fa";
import ReplyBox from "./ReplyBox.jsx";

export const Comment = ({ item, idx, photoId, addComment, receiver }) => {
  console.log(item);
  const [showReplyBox, setShowReplyBox] = useState(false);

  const replyClick = () => {
    setShowReplyBox(!showReplyBox);
  };

  const closeReplyBox = () => {
    setShowReplyBox(false);
  };

  return (
    <Fragment key={idx}>
      <div className="comment mb-2">
        <div>
          <div className="flex">
            {item.user.profilePicture !== null ? (
              <img
                src={item.user.profilePicture.url}
                className="rounded-full w-12 h-12 mr-4"
              />
            ) : (
              <div
                id="imagePreview"
                className="relative h-12 w-12 overflow-hidden rounded-full mr-4"
              >
                <div className="fill-current h-12 w-12  mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center">
                  <FaUserSecret className="text-2xl" />
                </div>
              </div>
            )}
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
