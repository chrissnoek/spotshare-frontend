import React, { Component } from "react";
import { FaCheck } from "react-icons/fa";

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
      "locationCard relative shadow-xs border-4 overflow-hidden hover:border-green-500";
    className += active ? " border-green-500" : "";
    return (
      <React.Fragment>
        <div
          className="w-full inline-block md:w-1/2 lg:w-1/3 m-2 rounded relative"
          onClick={this.onClickHandler}
        >
          {active && (
            <div className="absolute top-0 right-0 transform z-10 p-1 translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 text-white">
              <FaCheck />
            </div>
          )}
          <div className={className}>
            <div className="relative overflow-hidden">
              <img
                src={this.props.location.photos[0].photo[0].url}
                className="object-cover  w-full h-48  block"
                alt="Foto"
              />

              <div className="photoContent p-4 absolute bottom-0 left-0">
                <div className="photoInfo">
                  <h3 className="text-white">{this.props.location.title}</h3>
                  {/* <p className="text-white">{photo.category}</p> */}
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LocationCard;
