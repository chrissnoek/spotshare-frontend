import graphQLFetch from "../../graphQLFetch";

export const findNearbyLocations = async (
  lat,
  lng,
  category = "",
  distance = 5
) => {
  console.log("lat long form findlocneraby", lat, lng);
  // calculate min and max latitudes
  //echo 'submit';
  //const lat = this.state.photo.latitude;
  //const lng = this.state.photo.longitude;

  category && console.log(category);

  lat = parseFloat(lat);
  lng = parseFloat(lng);

  console.log(lat, lng);

  const radius = 6371; // earth's radius in km = ~6371

  function rad2deg(angle) {
    return angle * 57.29577951308232; // angle / Math.PI * 180
  }

  function deg2rad(angle) {
    return angle * 0.017453292519943295; // (angle / 180) * Math.PI;
  }

  // latitude boundaries
  const maxlat = lat + rad2deg(distance / radius);
  const minlat = lat - rad2deg(distance / radius);

  // longitude boundaries (longitude gets smaller when latitude increases)
  const maxlng = lng + rad2deg(distance / radius / Math.cos(deg2rad(lat)));
  const minlng = lng - rad2deg(distance / radius / Math.cos(deg2rad(lat)));

  function distanceFromLocation(lat1, lon1, lat2, lon2) {
    const theta = lon1 - lon2;
    let dist =
      Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.cos(deg2rad(theta));
    dist = Math.acos(dist);
    dist = rad2deg(dist);
    const miles = dist * 60 * 1.1515;
    return miles * 1.609344;
  }

  //$query = "template=location, place.lat>=$minlat, place.lat<=$maxlat, place.lng>=$minlng, place.lng<=$maxlng ";

  const query = `query locationsInRange($minlat:Float!, $maxlat:Float!, $minlng:Float!, $maxlng:Float! $cat:String){
        locations(where:{latitude_gte:$minlat,latitude_lte:$maxlat,longitude_gte:$minlng,longitude_lte:$maxlng,location_categories:$cat}) {
        title
        longitude
        latitude
		id
		location_categories {
			label
      value
      id
			locations {
        title
        id
			}
		}
		slug
        photos {
            id
            likes
            title
            slug
            photo {
                url 
            }
        }
        }
      }`;

  const search = {
    minlat: parseFloat(minlat),
    maxlat: parseFloat(maxlat),
    minlng: parseFloat(minlng),
    maxlng: parseFloat(maxlng),
  };

  if (category !== "") {
    search.cat = category;
  }

  console.log(search);

  //console.log(query, search);
  const result = await graphQLFetch(query, search, true);

  console.log("result from FindNearbyLocations", result);

  if (result.locations.length > 0) {
    //console.log("found locations", result.locations);

    // show only locations where a photo is linked to it
    const locations = result.locations.filter(
      (location) => location.photos.length > 0
    );
    //sort items on distance
    locations.forEach((location) => {
      // lat and lng are from this.state.photo
      const locDistance = distanceFromLocation(
        location.latitude,
        location.longitude,
        lat,
        lng
      );
      location["distance"] = locDistance;
    });

    locations.sort(function (a, b) {
      var keyA = new Date(a.distance),
        keyB = new Date(b.distance);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });

    return locations;
  } else {
    return null;
  }
};
