import React, { useState } from "react";
import { userContext } from "../../services/userContext.js";
import Link from "next/link";

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
                  <div className="flex flex-wrap -mx-3">
                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                      Reactie plaatsen
                    </h2>
                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                      <textarea
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                        name="body"
                        placeholder="Je bericht"
                        required
                        value={commentValue}
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <div className="w-full md:w-full flex items-start md:w-full px-3">
                      <div className="-mr-1">
                        <input
                          type="submit"
                          className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
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
