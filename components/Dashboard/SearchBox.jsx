import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { toast } from "react-toastify";

const SearchBox = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [formValue, setFormValue] = useState("");

  const handleDropdown = (focussed) => {
    setShowDropdown(focussed);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submiteed");
    console.log(formValue);
    const urlValue = formValue.trim().replace(/\s/g, "%20");

    const url = `https://nominatim.openstreetmap.org/search/${urlValue}?format=json&addressdetails=1&limit=1`;

    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      //console.log(json);
      //
      if (json.length > 0) {
        // the entered city can be converted to lat long
        sessionStorage.getItem("prevsettings") &&
          sessionStorage.removeItem("prevsettings");
        props.redirect(
          `/fotolocaties/resultaten/?lat=${json[0].lat}&lng=${json[0].lon}`
        );
      } else {
        toast.error(
          "Het lijkt erop dat je geen geldige locatie hebt ingevuld :-("
        );
      }
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  const handleChange = (e) => {
    setFormValue(e.target.value);
  };

  const searchCurLoc = () => {
    // get users position
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async (pos) => {
      var crd = pos.coords;

      sessionStorage.getItem("prevsettings") &&
        sessionStorage.removeItem("prevsettings");

      props.redirect(
        `/fotolocaties/resultaten/?lat=${crd.latitude}&lng=${crd.longitude}`
      );
    };

    const error = async (err) => {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then(async (location) => {
          props.redirect(
            `/fotolocaties/resultaten/?lat=${location.latitude}&lng=${location.longitude}`
          );
        });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div className="searchBox max-w-md mx-auto">
      <form
        action="/fotolocaties/resultaten/"
        method="get"
        id="search-locations"
        onSubmit={handleSubmit}
      >
        <div className="relative">
          <div className="relative">
            <input type="hidden" name="lat" id="lat" />
            <input type="hidden" name="lng" id="lng" />

            <input
              className="rounded border border-gray-300 px-4 py-2 w-full top-0 left-0 focus:rounded-t"
              type="search"
              placeholder="Locatie zoeken"
              onFocus={() => {
                handleDropdown(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  handleDropdown(false);
                }, 1000);
              }}
              onChange={handleChange}
            />
            <FaSearch className="absolute top-0 right-0 m-3 fill-current text-gray-500" />
          </div>
          {showDropdown && (
            <div className="dropdown bg-white rounded-b border absolute w-full">
              <div className="flex justify-center items-center px-4 py-2">
                <TiLocationArrow />
                <span onClick={searchCurLoc}>Gebruik huidige locatie</span>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
