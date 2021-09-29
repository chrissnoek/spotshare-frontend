import React, { useState } from "react";
import { userContext } from "../../services/userContext.js";
import Link from "next/link";
import UserProfilePicture from "../shared/UserProfilePicture.jsx";

const ReplyBox = ({
  replyTo = null,
  photoId,
  addComment,
  closeBoxHandler,
  receiver,
}) => {
  const [commentValue, setCommentValue] = useState("");

  const onChange = (event) => setCommentValue(event.target.value);

  const post = (userId) => {
    const data = {
      body: commentValue,
      photo: photoId,
      user: userId,
      parent: replyTo,
    };
    let input = {};
    input["data"] = data;
    addComment(input, receiver);
    closeBoxHandler && closeBoxHandler();
    setCommentValue("");
  };

  return (
    <>
      <userContext.Consumer>
        {(value) => {
          if (value.user) {
            return (
              <div className="flex mb-6">
                <div className="w-full">
                  <div className="flex items-center  pt-4">
                    <div className="flex-1">
                      <UserProfilePicture profile={value.user} size={8} />
                    </div>
                      <textarea
                        className="w-full flex-auto mx-3 bg-gray-100 rounded-lg border border-gray-100 leading-normal h-12 resize-none w-full py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="Plaats een reactie"
                        required
                        value={commentValue}
                        onChange={onChange}
                      ></textarea>
                    <div className="w-full  flex-1 items-start pl-3">
                      <div className="">
                        <input
                          type="submit"
                          className="text-white bg-blue-500 font-medium h-12 cursor-pointer py-1 px-4 border-none rounded-lg tracking-wide hover:bg-blue-600 hover:text-white"
                          value="Plaatsen"
                          onClick={() => {
                            post(value.user.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="p-4 mt-4 mb-6 bg-blue-100 rounded border border-blue-200 text-blue-400">
                <Link href="/inloggen">
                  <a className="font-bold text-blue-400 hover:text-blue-500">
                    Login
                  </a>
                </Link>{" "}
                om een reactie te plaatsen
              </div>
            );
          }
        }}
      </userContext.Consumer>
    </>
  );
};

export default ReplyBox;
