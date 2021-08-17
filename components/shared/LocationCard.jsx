import React, { Component } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import LocationHashtag from "./LocationHashtag.jsx";

class LocationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeLocation !== this.props.activeLocation) {
      const active =
        this.props.location === this.props.activeLocation ? true : false;
      this.setState({ active });
    }
  }

  onClickHandler = () => {
    this.props.onClick(this.props.location);
  };

  render() {
    const { active } = this.state;
    let className =
      " flex items-center p-1";
    className += active ? " border-green-500 border" : "";

    const featuredPhoto = this.props.location.photos
      .sort((a, b) => b.likes - a.likes)[0]
      .photo[0];

    let imageUrl = '';

    if (featuredPhoto.formats) {
      if (featuredPhoto.formats.thumbnail) {
        imageUrl = featuredPhoto.formats.thumbnail.url;
      } else if (featuredPhoto.formats.small) {
        imageUrl = featuredPhoto.formats.small.url;
      } else if (featuredPhoto.formats.medium) {
        imageUrl = featuredPhoto.formats.medium.url;
      } else if (featuredPhoto.formats.large) {
        imageUrl = featuredPhoto.formats.large.url;
      } else {
        imageUrl = featuredPhoto.url;
      }
    } else {
      imageUrl = featuredPhoto.url;
    }


    return (
      <React.Fragment>
        <div
          className="w-full mb-2 relative shadow hover:shadow-lg transition ease-in-out rounded"
          onClick={this.onClickHandler}
        >
          {active && (
            <div className="absolute top-0 right-0 transform z-10 p-1 translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 text-white">
              <FaCheck />
            </div>
          )}
          <div className={className}>
            <Image
              className={`rounded block max-w-none w-20 h-16 object-cover`}
              width={76}
              height={76}
              style={{
                backgroundColor: "grey",
              }}
              src={imageUrl}
              alt={`Bekijk locatie ${this.props.location.title}`}
            />

            <div className="px-5 py-2">
              <h3 className="text-black text-lg">{this.props.location.title}</h3>
              {this.props.location.location_categories.map((category) => (
                <LocationHashtag key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LocationCard;
