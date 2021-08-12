import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import LocationHashtag from "./LocationHashtag.jsx";

const LocationList = ({ location, active, selectLocation }) => {
  let featuredPhoto = location.photos
    .sort((a, b) => b.likes - a.likes)[0];

  if (featuredPhoto.photo[0].formats) {
    let imageUrl = '';

    if (featuredPhoto.photo[0].formats.thumbnail) {
      imageUrl = featuredPhoto.photo[0].formats.thumbnail.url;
    } else if (featuredPhoto.photo[0].formats.small) {
      imageUrl = featuredPhoto.photo[0].formats.small.url;
    } else if (featuredPhoto.photo[0].formats.medium) {
      imageUrl = featuredPhoto.photo[0].formats.medium.url;
    } else if (featuredPhoto.photo[0].formats.large) {
      imageUrl = featuredPhoto.photo[0].formats.large.url;
    } else {
      imageUrl = featuredPhoto.photo[0].url;
    }

    const router = useRouter();
    let cardClass = active
      ? "w-full mb-1 border-2 border-green-500"
      : "w-full mb-1 border-2 border-white";

    const goToLocation = (slug, id) => {
      let data = [];
      if (sessionStorage.getItem("visitedLocations")) {
        data = JSON.parse(sessionStorage.getItem("visitedLocations"));
      }
      if (data.indexOf(id) === -1) {
        data.push(id);
      }
      sessionStorage.setItem("visitedLocations", JSON.stringify(data));

      router.push(`/fotolocatie/${slug}`);
    };

    return (
      <div className="cursor-pointer">
        <div
          onMouseOver={() => {
            selectLocation(location.id);
          }}
          onMouseOut={() => {
            selectLocation("");
          }}
          className={`relative shadow hover:shadow-lg transition ease-in-out rounded ${cardClass}`}
        >
          <div
            className="flex items-center p-1"
            onClick={() => {
              goToLocation(location.slug, location.id);
            }}
          >
            <Image
              className={`rounded block max-w-none w-20 h-16 object-cover`}
              width={76}
              height={76}
              style={{
                backgroundColor: "grey",
              }}
              src={imageUrl}
              alt={`Bekijk locatie ${location.title}`}
            />

            <div className="px-5 py-2">
              <h3 className="text-black text-lg">{location.title}</h3>
              {location.location_categories.map((category) => (
                <LocationHashtag key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default LocationList;
