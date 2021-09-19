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
	console.log(photo);
  const [isServer, setIsServer] = useState(true);
  const [myFaves, setMyFaves] = useState(me?.likedPhotos?.map((fav) => fav.id));
  const [photoFaves, setPhotoFaves] = useState(photo.usersLike.map((fav) => fav.id));

  useEffect(() => {
	  console.log(me);
    setIsServer(false);
  }, []);

  useEffect(() => {
	let _photoFaves = [];
	if(photo.usersLike) {
		_photoFaves = photo.usersLike.map((fav) => fav.id);
	}
	setPhotoFaves(_photoFaves);
  }, [photo])

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

    if (action === "add") {
		// add user id to photoLikes
		if (!_photoFaves.includes(me.id)) { 
			_photoFaves.push(me.id);
			setPhotoFaves(_photoFaves);
		} else {
			// already in favourites
			return;
		}

		if (!_myFaves.includes(likedId)) {
			_myFaves.push(likedId);
			setMyFaves(_myFaves);
			await CreateNotification(user.id, receiver, "like", likedId);
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
			  setPhotoFaves(_photoFaves);
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
		  setMyFaves(_myFaves);
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

							if (value.user.id === photo.user.id) {
								return false;
							}

							let favourite;

							if (
								value.user &&
								photo.usersLike.filter(
								(favourites) => favourites.id === value.user.id
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
    </div>
  );
};
