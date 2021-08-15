import React, { useEffect, useState } from "react";
import { findNearbyLocations } from "../shared/FindNearbyLocations";
import LocationHashtag from "../shared/LocationHashtag";
import Link from "next/link";
import Image from "next/image";

const LocationsNearby = () => {
  const [locations, setLocations] = useState();

  const getImageUrl = (location) => {
    let featuredPhoto = location.photos
      .sort((a, b) => b.likes - a.likes)[0];

    let imageUrl = '';

    if (featuredPhoto.photo[0].formats) {
      if (featuredPhoto.photo[0].formats.thumbnail) {
        imageUrl = featuredPhoto.photo[0].formats.thumbnail.url;
      } else if (featuredPhoto.photo[0].formats.small) {
        imageUrl = featuredPhoto.photo[0].formats.small.url;
      } else if (featuredPhoto.photo[0].formats.medium) {
        imageUrl = featuredPhoto.photo[0].formats.medium.url;
      } else if (featuredPhoto.photo[0].formats.large) {
        imageUrl = featuredPhoto.photo[0].formats.large.url;
      }
    } else {
      imageUrl = featuredPhoto.photo[0].url;
    }
    return imageUrl;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (match, search, showError) => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (pos) => {
      console.log("succes");
      var crd = pos.coords;
      const _locations = await findNearbyLocations(crd.latitude, crd.longitude);
      console.log(_locations);
      setLocations(_locations);
    };

    const error = async (err) => {
      console.log("err");
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then(async (location) => {
          const _locations = await findNearbyLocations(
            location.latitude,
            location.longitude,
            "",
            1.5
          );
          console.log(location, _locations);
          setLocations(_locations);
        });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="">
      <h2 className="text-black mb-4">Locaties in de buurt</h2>

      {locations &&
        locations.map((location) => {
          return (
            <div
              key={location.id}
              className={`overflow-hidden relative rounded shadow hover:shadow-lg transition-shadow duration-500 ease-in-out mb-4`}
            >
              <Link href={`/fotolocatie/${location.slug}`}>
                <a className="absolute w-full h-full top-0 left-0 z-10"></a>
              </Link>
              <div className="flex items-center">
                <div className="w-20 h-20 mr-4 relative">
                  <Image
                    className={`object-cover`}
                    src={getImageUrl(location)}
                    alt={`Bekijk locatie ${location.title}`}
                    layout="fill"
                    object="cover"
                  />
                </div>

                <div className="w-full leading-tight">
                  <h3 className="text-black text-sm">{location.title}</h3>
                  {[location.location_categories[0], location.location_categories[1], location.location_categories[2]].map((category) => (typeof category != "undefined" &&
                    <LocationHashtag key={category.id} category={category} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LocationsNearby;
