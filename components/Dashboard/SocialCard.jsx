import React, { useEffect, useState } from "react";
import UserProfilePicture from "../shared/UserProfilePicture.jsx";
import Link from "next/link";
import moment from 'moment';
import CreateNotification from "../shared/CreateNotification.jsx";
import { userContext } from "../../services/userContext.js";
import 'moment/locale/nl';
import FavButton from "../shared/favButton.jsx";
import graphQLFetch from "../../graphQLFetch.js";
import { useRouter } from "next/router";
import PhotoComment from "../Comments/Comments.jsx";

const MyClassWithRouter = (props) => {
  const [isServer, setIsServer] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsServer(false);
  }, []);

  {
    return !isServer ?
      <userContext.Consumer>
        {(value) => {
          if (value.user) {
              return <SocialCard {...props}  me={value.user} />;
          } else {
            return <SocialCard {...props}  me={false} />;
          }
        }}
      </userContext.Consumer>
      : <SocialCard {...props} router={router} me={false} />
  }

};
export default MyClassWithRouter;

const SocialCard = ({ photo, me }) => {
  const [isServer, setIsServer] = useState(true);
  const [myFaves, setMyFaves] = useState(me?.likedPhotos?.map((fav) => fav.id));
  const [photoFaves, setPhotoFaves] = useState(photo.usersLike.map((fav) => fav.id));
  const [comments, setComments] = useState([...photo.comments]);
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    setIsServer(false);
  }, []);

  useEffect(() => {
    let _photoFaves = [];
    if(photo.usersLike) {
      _photoFaves = photo.usersLike.map((fav) => fav.id);
    }
    setPhotoFaves(_photoFaves);
  }, [photo]);

  const addComment = async (data, receiver) => {
	setLoadingComment(true);
    // console.log(data, receiver);

    const query = `mutation createPhotoComment($input: createPhotoCommentInput){
      createPhotoComment(
        input: $input
      ) {
        photoComment {
          body
          id
          parent {
            id
          }
          user {
            id
            firstname
            lastname
            profilePicture {
              url
            }
            slug
            username
          }
        }
      }
    }`;

    let input = { input: data };
    // console.log(input);

    const response = await graphQLFetch(query, input, true, true);
    console.log(response);

    if (response) {
      if (!response.errors) {
        await CreateNotification(
          data.data.user,
          receiver,
          "comment",
          data.data.photo
        );

        let _comments = [...comments];

        _comments.push(response.createPhotoComment.photoComment);

		setComments(_comments);

		setLoadingComment(false);
      } else {
        // console.log("an error happened");
		setLoadingComment(false);
      }
    }
  };

  const updateFav = async (user, likedId, action, receiver) => {
    // TODO: store user.likedPhotos in state, and map favArray from state instead of user object
    // problem: user.likedPhotos is not updated
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            likedPhotos {
              id
            }
          }
        }
      }`;

    let _myFaves = [...myFaves];
    let _photoFaves = [...photoFaves];
    let createNotification = false;

    if (action === "add") {
      // add user id to photoLikes
      if (!_photoFaves.includes(me.id)) { 
        _photoFaves.push(me.id);
      } else {
        // already in favourites
        return;
      }

      if (!_myFaves.includes(likedId)) {
        _myFaves.push(likedId);
        
        createNotification = true;
      } else {
        // already in favourites
        return;
      }
    } else if (action === "remove") {


      if (_photoFaves.includes(me.id)) {
        // likedId is in array, so remove it from array
        const index = _photoFaves.indexOf(me.id);
        if (index > -1) {
          _photoFaves.splice(index, 1);
        }
		  } else {
        // not in favourites
        return;
		  }

      if (_myFaves.includes(likedId)) {
        // likedId is in array, so remove it from array
        const index = _myFaves.indexOf(likedId);
        if (index > -1) {
          _myFaves.splice(index, 1);
		      
        }
      } else {
        // not in favourites
        return;
      }
    }

    const variables = {
      input: {
        where: {
          id: user.id,
        },
        data: {
          likedPhotos: _myFaves,
        },
      },
    };

    const data = await graphQLFetch(query, variables, true);

    if(data.updateUser) {
      if(createNotification) {
        await CreateNotification(user.id, receiver, "like", likedId);
        setPhotoFaves(_photoFaves);
        setMyFaves(_myFaves);
      }
    }

  };


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
			<Link href={`/fotograaf/${photo.user.slug}`}>
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
		<div className="relative">
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
		<div className="flex mt-2">
			<div>
				<div className="font-bold mb-2 text-xl">{photo.title}</div>
				<div>{photo?.desc?.replace(/(<([^>]+)>)/gi, "")}</div>
			</div>
			<div className="ml-auto">
				<userContext.Consumer>
					{(value) => {
						if (value.user) {

							let favourite;

							if (
								value.user &&
								photoFaves.filter(
								(favourites) => favourites === value.user.id
								).length > 0
							) {
								favourite = true;
							} else {
								favourite = false;
							}

							return (
								<FavButton
									favourite={favourite}
									updateFav={updateFav}
									user={value.user}
									likedId={photo.id}
									addTitle="Toevoegen aan favorieten"
									removeTitle="Verwijderen uit favorieten"
									receiver={photo.user.id}
									type="photo"
									icon={true}
									count={photoFaves.length}
								/>
							);
						}
					}}
				</userContext.Consumer>
			</div>
		</div>

		<PhotoComment
			comments={comments}
			photoId={photo.id}
			addComment={addComment}
			receiver={photo.user.id}
			loadingComment={loadingComment}
		/>
    </div>
  );
};
