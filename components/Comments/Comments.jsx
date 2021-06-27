import React, { useState, useEffect } from "react";
import { Comment } from "./RecursiveComment.jsx";
import ReplyBox from "./ReplyBox.jsx";

const PhotoComment = ({ comments, photoId, addComment, receiver }) => {
  const [unflattenedComments, setUnflattenedComments] = useState([]);

  useEffect(() => {
    setUnflattenedComments(unflatten(comments));
  }, [comments]);

  const unflatten = (arr) => {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]["children"] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parent) {
          mappedArr[mappedElem.parent.id]["children"].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.unshift(mappedElem);
        }
      }
    }
    return tree;
  };

  return (
    <>
      <ReplyBox photoId={photoId} addComment={addComment} receiver={receiver} />

      <div className="">
        {unflattenedComments.length
          ? unflattenedComments.map((item, idx) => {
              return (
                <Comment
                  item={item}
                  key={idx}
                  photoId={photoId}
                  addComment={addComment}
                  receiver={receiver}
                />
              );
            })
          : ""}
      </div>
    </>
  );
};

export default PhotoComment;
