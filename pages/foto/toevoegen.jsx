/* globals React */
import React, { useEffect } from "react";
import graphQLFetch from "../../graphQLFetch";
import EXIF from "exif-js";
import { FaSpinner } from "react-icons/fa";
import exifr from "exifr";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import userIcon from "../../assets/userMarker.svg";
import locationIcon from "../../assets/locationMarker.svg";
import LocationCard from "../../components/shared/LocationCard";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import slugify from "slugify";
import AddPhoto from "../../components/shared/AddPhoto";
import { userContext } from "../../services/userContext.js";
import { findNearbyLocations } from "../../components/shared/FindNearbyLocations";
import { useRouter } from "next/router";
import auth from "../../services/authService";
import Head from "next/head";

const animatedComponents = makeAnimated();

const MyClassWithRouter = (props) => {
  const router = useRouter();

  const checkRedirect = async () => {
    const user = await auth.getCurrentUser();
    if (user === null) {
      router.push("/inloggen");
    }
  };

  useEffect(() => {
    checkRedirect();
  }, []);

  return <PhotoAddStrapi {...props} router={router} />;
};
export default MyClassWithRouter;

class PhotoAddStrapi extends React.Component {
  redirect = (slug) => {
    //if the query returns an id in data, the photo is created
    // redirect to created photo
    this.props.router.push(`/foto/${slug}`);
  };

  // we are rendering the actual component to have access to the Context
  // outside of the renderfunction in the next component
  // We have to pass functions to make use of the router functionality

  render() {
    return (
      <userContext.Consumer>
        {(value) => {
          console.log(value.user);
          return value.user && value.user.id ? (
            <AddPhotoForm
              value={value}
              redirect={this.redirect}
              fetchLocation={this.fetchLocation}
            />
          ) : (
            <div>
              <Head>
                <meta name="robots" content="noindex,nofollow,noarchive" key="robots" />
              </Head>
              <p>Niet ingelogd</p>
            </div>
          )}
        }
      </userContext.Consumer>
    );
  }
}

class AddPhotoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      photo: {},
      photoLoading: false,
      tempFile: null,
      onDrop: false,
      onDragOver: false,
      uploadPercentage: 0,
      invalidFields: {},
      blob: null,
      map: {
        longitude: null,
        latitude: null,
        zoom: 13,
      },
      locationKnown: false,
      selectedLocation: null,
      locationCategoryValues: [],
      photoCategoryValues: [],
      monthValues: [],
      months: null,
      location_categories: null,
      photo_categories: null,
      newLocation: false,
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.fileInput = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // console.log("component updated", prevProps, this.props);
    const {
      value: { user: prevUser },
    } = prevProps;
    const {
      value: { user },
    } = this.props;
    if (prevUser !== user && user.id) {
      this.updateContext();
    }
  }

  updateContext() {
    this.setState((prevState) => ({
      ...prevState,
      photo: { ...prevState.photo, user: this.props.value.user.id },
    }));
  }

  onNewLocationClick = (e) => {
    this.setNewLocation();
    this.resetSelectedLocation();
  };

  setNewLocation = () => {
    this.setState({ newLocation: true });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };


  nextButton(disabled, btnClass) {
    let currentStep = this.state.currentStep;
    if (currentStep < 2) {
      return (
        <button
          disabled={disabled}
          className={btnClass}
          type="button"
          onClick={this._next}
        >
          Volgende
        </button>
      );
    }
    return null;
  }


  changeMarkers = () => {
    // loading leaflet in componentDidMount because it doenst support SSR
    const L = require("leaflet");

    const userMarker = new L.Icon({
      iconUrl: "/userMarker.svg",
      iconRetinaUrl: "/userMarker.svg",

      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
    });

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: "/locationMarker.svg",
      iconRetinaUrl: "/locationMarker.svg",
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
      shadowUrl: "/marker-shadow.png",
      shadowAnchor: [13, 40],
      iconSize: new L.Point(32, 40),
    });
  };

  componentDidMount(prevProps, prevState) {
    // handle blob in 'onFileChange' from state
    // blob gets set on choosing file
    this.changeMarkers();
    this.updateContext();
  }

  onPhotoCategoryCreate = async (option) => {
    const label = option;

    // check if slug is available, if not, add number
    const value = slugify(option, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const query = `mutation CreatePhotoCategory($input: createPhotoCategoryInput) {
            createPhotoCategory(input: $input){
            photoCategory{
              label
              value
              id
            }
          }
          }`;

    let input = {};
    input["data"] = {
      label: label,
      value: value,
    };

    const data = await graphQLFetch(query, { input }, true);

    if (data) {
      const { label, value, id } = data.createPhotoCategory.photoCategory;
      this.setState((prevState) => {
        const oldCategories = [...this.state.photoCategoryValues];
        const newCategory = {
          label: label,
          value: value,
          id: id,
        };
        oldCategories.push(newCategory);

        const selectedValues =
          this.state.photo_categories != null
            ? this.state.photo_categories
            : [];
        selectedValues.push(newCategory);

        const categoryIds = this.state.photo.photo_categories
          ? this.state.photo.photo_categories
          : [];
        categoryIds.push(newCategory.id);

        return {
          photo: {
            ...prevState.photo,
            photo_categories: [...categoryIds],
          },
          photoCategoryValues: [...oldCategories],
          photo_categories: selectedValues,
        };
      });
      return {
        label: label,
        value: value,
      };
    }
  };

  onLocationCategoryCreate = async (option) => {
    const label = option;

    // check if slug is available, if not, add number
    const value = slugify(option, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const query = `mutation CreateLocationCategory($input: createLocationCategoryInput) {
            createLocationCategory(input: $input){
            locationCategory{
              label
              value
              id
            }
          }
          }`;

    let input = {};
    input["data"] = {
      label: label,
      value: value,
    };

    const data = await graphQLFetch(query, { input }, true);

    if (data) {
      const { label, value, id } = data.createLocationCategory.locationCategory;
      this.setState((prevState) => {
        const oldCategories = [...this.state.locationCategoryValues];
        const newCategory = {
          label: label,
          value: value,
          id: id,
        };
        oldCategories.push(newCategory);

        const selectedValues =
          this.state.location_categories != null
            ? this.state.location_categories
            : [];
        selectedValues.push(newCategory);

        const categoryIds = this.state.location.location_categories
          ? this.state.location.location_categories
          : [];
        categoryIds.push(newCategory.id);

        return {
          location: {
            ...prevState.location,
            location_categories: [...categoryIds],
          },
          locationCategoryValues: [...oldCategories],
          location_categories: selectedValues,
        };
      });
      return {
        label: label,
        value: value,
      };
    }
  };

  handlePhotoCategorySelect = (newValue, name) => {
    /*
        set the ID of the location_categories to location object
        and update the selected values in object location_categories in the state
        */
    let ids;
    if (newValue !== null) {
      ids = newValue.map((item) => {
        return item.id;
      });
    } else {
      ids = [];
    }

    this.setState((prevState) => ({
      ...prevState,
      photo: { ...prevState.photo, [name]: ids },
      [name]: newValue,
    }));
  };

  handleSelect = (newValue, name) => {
    /*
        set the ID of the location_categories to location object
        and update the selected values in object location_categories in the state
        */
    let ids;
    if (newValue !== null) {
      ids = newValue.map((item) => {
        return item.id;
      });
    } else {
      ids = [];
    }

    this.setState((prevState) => ({
      ...prevState,
      location: { ...prevState.location, [name]: ids },
      [name]: newValue,
    }));
  };

  createLocation = async () => {
    // console.log("creating location");

    const {
      location,
      location: { title },
    } = this.state;

    // console.log(location, title);

    const slug = slugify(title, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const query = `mutation CreateLocation($input: createLocationInput) {
            createLocation(input: $input){
            location{
              slug
              id
            }
          }
          }`;

    let input = {};
    location["slug"] = slug;
    input["data"] = location;

    // console.log(input);
    const data = await graphQLFetch(query, { input }, true);

    if (data) {
      return data.createLocation;
    }
  };

  handleInputChange = (event, property) => {
    // console.log("handling on input chagne");
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => {
      let stateFields;
      if (property === "location") {
        // console.log("setting location state");
        stateFields = {
          ...prevState,
          location: { ...prevState.location, [name]: value },
        };
      } else {
        stateFields = {
          ...prevState,
          photo: { ...prevState.photo, [name]: value },
        };
      }

      const invalidFields = { ...prevState.invalidFields };
      if (this.state.photo.title && this.state.invalidFields.title)
        delete invalidFields["title"];
      stateFields["invalidFields"] = invalidFields;
      return stateFields;
    });
  };

  removeImage = () => {
    // console.log("remove");
    this.setState({
      tempFile: null,
      photo: {},
      blob: null,
      locationKnown: false,
    });
  };

  photoValidation = (file) => {
    if (file.size > 27000000) {
      this.setState((prevState) => ({
        ...prevState,
        invalidFields: {
          ...prevState.invalidFields,
          blob: "Selecteer een afbeelding kleiner dan 27MB.",
        },
      }));
      return;
    } else {
      this.setState((prevState) => {
        const invalidFields = { ...prevState.invalidFields };
        if (invalidFields.hasOwnProperty("blob")) delete invalidFields["blob"];
        return { invalidFields };
      });
    }
  };

  onFileChange = async (e) => {
    const file = e.target.files[0];
    this.setState({ blob: e.target.files[0] });

    this.photoValidation(file);

    this.setState({
      photoLoading: true,
    });

    var reader = new FileReader();
    reader.onload = () => {
      this.setState({
        photoLoading: false,
        tempFile: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);

    // TODO: extract lensmodel, and write location suggestion
    let exifrGps = await exifr.gps(file);
    let output = await exifr.parse(file, ["LensModel"]);

    // if the photo contains gps data
    if (exifrGps) {
      let { longitude, latitude } = exifrGps;
      this.setState((prevState) => ({
        ...prevState,
        locationKnown: true,
        photo: { ...prevState.photo, longitude, latitude },
      }));
    }

    if (file && file.name) {
      EXIF.getData(file, () => {
        let exifData = EXIF.pretty(file);
        if (
          exifData &&
          EXIF.getTag(file, "ExposureTime") &&
          EXIF.getTag(file, "ISOSpeedRatings") &&
          EXIF.getTag(file, "FNumber")
        ) {
          let date = EXIF.getTag(file, "DateTime");
          if (date) {
            let splittedDate = EXIF.getTag(file, "DateTime")
              .substr(0, 10)
              .split(":");
            const year = splittedDate[0];
            const month = splittedDate[1];
            const day = splittedDate[2];
            let dateVal = `${year}-${month}-${day}`;

            this.setState((prevState) => ({
              ...prevState,
              photo: { ...prevState.photo, date: dateVal },
            }));
          }

          const shutterVal =
            EXIF.getTag(file, "ExposureTime").numerator /
            EXIF.getTag(file, "ExposureTime").denominator;
          let shutterspeedVal =
            shutterVal > 1 ? shutterVal : "1/" + 1 / shutterVal;
          let ISOVal = EXIF.getTag(file, "ISOSpeedRatings");
          let apertureVal =
            EXIF.getTag(file, "FNumber").numerator /
            EXIF.getTag(file, "FNumber").denominator;
          let focalLengthVal = EXIF.getTag(file, "FocalLength") + "mm";
          let cameraVal = EXIF.getTag(file, "Model");

          this.setState((prevState) => ({
            ...prevState,
            photo: {
              ...prevState.photo,
              shutterspeed: shutterspeedVal,
              iso: ISOVal,
              aperture: apertureVal,
              focalLength: focalLengthVal,
              camera: cameraVal,
            },
          }));
        } else {
          this.setState((prevState) => ({
            ...prevState,
            photo: {
              ...prevState.photo,
              date: "",
              shutterspeed: "",
              iso: "",
              aperture: "",
              focalLength: "",
              camera: "",
            },
          }));
        }
      });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        photo: {
          ...prevState.photo,
          date: "",
          shutterspeed: "",
          iso: "",
          aperture: "",
          focalLength: "",
          camera: "",
        },
      }));
    }
  };

  handleOnDrop = (e) => {
    // console.log("handleOnDrop fired", e);
  };
  handleOnDragOver = (e) => {
    this.setState({ onDragOver: true });
  };
  handleOnDragLeave = (e) => {
    this.setState({ onDragOver: false });
  };

  checkForAvailableSlug = async (slug) => {
    let query = `query photoBySlug($slug: String!){
            photoBySlug(slug: $slug) {
                title
            }
        }`;

    const result = await graphQLFetch(query, { slug }, true);
    return result;
  };


  createSlug = async (slug, suffix, previousSuffix) => {
    var result = await this.checkForAvailableSlug(slug);

    if (!result.photoBySlug) {
      // console.log("final returned slug by Createdslug:", slug);
      return slug;
    } else {
      if (!suffix) {
        suffix = 1;
      } else {
        suffix++;
      }
      const cleanSlug = slug.replace(previousSuffix, "");

      const createdSuffix = "-" + suffix;
      let adjustedSlug = cleanSlug + createdSuffix;
      return this.createSlug(adjustedSlug, suffix, createdSuffix);
    }
  };


  fetchCategories = async () => {
    // build the graphql query
    const query = `query locationCategories{
            locationCategories {
              label
              value
              id
            }
            photoCategories {
              label
              value
              id
            }
            months {
              label
              value
              id
            }
          }`;
    const result = await graphQLFetch(query, {}, true);
    this.setState({
      locationCategoryValues: result.locationCategories,
      photoCategoryValues: result.photoCategories,
      monthValues: result.months,
    });
  };

  async handleSubmit(e) {
    // console.log("submitted");
    e.preventDefault();
    e.persist();

    this.setState({ loading: true });
    this.setState({ uploadPercentage: '10' });

    const {
      blob,
      newLocation,
      photo: { title },
    } = this.state;

    // check if an image is given, and title, if not show error and return null;
    if (!blob || !title) {
      if (!blob) {
        // console.log("no blob in state");
        this.setState((prevState) => ({
          ...prevState,
          invalidFields: {
            ...prevState.invalidFields,
            blob: "Voeg je nog een foto toe? 📸",
          },
        }));
        this.setState({ loading: false });
        this.setState({ uploadPercentage: '0' });
      }
      if (!title) {
        // console.log("no title in state.photo");
        this.setState((prevState) => ({
          ...prevState,
          invalidFields: {
            ...prevState.invalidFields,
            title: "Wat is de titel van je foto? 📸",
          },
        }));
      }
      // console.log("returning");
      this.setState({ loading: false });
      this.setState({ uploadPercentage: '0' });
      return;
    }

    let createdLocation = null;
    if (newLocation) {
      createdLocation = await this.createLocation();
      // console.log(createdLocation);
      this.setState({ uploadPercentage: '50' });
    } else {
      // console.log("no new location found");
      this.setState({ uploadPercentage: '50' });
    }

    // check if slug is available, if not, add number
    let slug = slugify(title, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const createdSlug = await this.createSlug(slug);

    // if slug is available, add to the state
    this.setState((prevState) => {
      return {
        ...prevState,
        photo: {
          ...prevState.photo,
          user: this.props.value.user.id,
          slug: createdSlug,
          location:
            createdLocation !== null
              ? createdLocation.location.id
              : prevState.photo.location,
          date: prevState.photo.date ? new Date(prevState.photo.date) : null,
          iso: prevState.photo.iso ? prevState.photo.iso.toString() : null,
          aperture: prevState.photo.aperture
            ? prevState.photo.aperture.toString()
            : null,
          shutterspeed: prevState.photo.shutterspeed
            ? prevState.photo.shutterspeed.toString()
            : null,
        },
      };
    });

    //create photo page with info
    // query for new photo
    const query = `mutation CreatePhoto($input: createPhotoInput) {
            createPhoto(input: $input){
                photo{
                    title
                    desc
                    slug
                    date
                    brand
                    shutterspeed
                    iso
                    aperture
                    camera
                    focalLength
                    id
                    photo_categories {
                      id
                    }
                    location {
                        id
                        title
                        longitude
                        latitude
                    }
                }
            }
        }`;

    let input = {};
    input["data"] = this.state.photo;
    delete input.data.blob;
    delete input.data.longitude;
    delete input.data.latitude;

    console.log("input", input);

    const data = await graphQLFetch(query, { input }, true);

    if (data) {
      this.setState({ uploadPercentage: '75' });
      // console.log("photo page created, uploading foto..");
      //after pages is created, use refId to upload files with xhr request

      const redirect = () => {
        this.setState({ uploadPercentage: '100' });
        //if the query returns an id in data, the photo is created
        // redirect to created photo
        this.props.redirect(data.createPhoto.photo.slug);
      };

      const formData = new FormData();

      const { blob: uploadedFile } = this.state;

      formData.append(`files`, uploadedFile, uploadedFile.name);
      formData.append("ref", "photo");
      formData.append("field", "photo");
      formData.append("refId", data.createPhoto.photo.id);

      const request = new XMLHttpRequest();
      request.open("POST", `https://spotshare-strapi.herokuapp.com/upload`);
      request.send(formData);
      request.addEventListener("load", redirect);
    } else {
      // console.log("failed");
      this.setState({ uploadPercentage: 0 });
      this.setState({ loading: false });
    }
  }

  onLocationSelect = (location) => {
    // if existing location is selected, add to the state
    this.setState((prevState) => ({
      ...prevState,
      selectedLocation: location,
      photo: { ...prevState.photo, location: location.id },
    }));
  };

  resetSelectedLocation = () => {
    this.setState((prevState) => ({
      ...prevState,
      selectedLocation: null,
      photo: { ...prevState.photo, location: null },
    }));
  };

  updateNewLocationCoords = (lat, lng) => {
    // console.log(lat, lng);
    this.setState((prevState) => ({
      ...prevState,
      newLocation: false,
      location: { ...prevState.location, longitude: lng, latitude: lat },
    }));
  };

  render() {
    let btnClass = "block px-4 py-2 my-2 text-white rounded text-l float-right";
    let disabled =
      this.state.currentStep == 1
        ? this.state.photo.title === undefined ||
        this.state.photo.title === "" ||
        this.state.blob === null
        : false;
    btnClass += disabled ? " bg-gray-400" : " bg-blue-600";

    return (
      <React.Fragment>
        <form
          name="photoAdd"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
          className="photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6"
        >
          <Head>
            <title key="title">Foto toevoegen | Spotshare</title>
            <meta name="robots" content="noindex,nofollow,noarchive" key="robots" />
          </Head>
          <h1 className="my-2 font-bold">Foto toevoegen</h1>

          <AddPhoto
            currentStep={this.state.currentStep}
            state={this.state}
            fileInput={this.fileInput}
            onFileChange={this.onFileChange}
            onChange={this.handleInputChange}
            handleOnDrop={this.handleOnDrop}
            handleOnDragOver={this.handleOnDragOver}
            handleOnDragLeave={this.handleOnDragLeave}
            removeImage={this.removeImage}
            onCategoryCreate={this.onPhotoCategoryCreate}
            fetchCategories={this.fetchCategories}
            photoCategoryValues={this.state.photoCategoryValues}
            photo_categories={this.state.photo_categories}
            handleSelect={this.handlePhotoCategorySelect}
          />
          {this.state.currentStep === 2 && (
            <Step2
              currentStep={this.state.currentStep}
              state={this.state}
              findNearbyLocations={findNearbyLocations}
              onLocationSelect={this.onLocationSelect}
              resetSelectedLocation={this.resetSelectedLocation}
              activeLocation={this.state.selectedLocation}
              onChange={this.handleInputChange}
              updateNewLocationCoords={this.updateNewLocationCoords}
              handleSelect={this.handleSelect}
              onCategoryCreate={this.onLocationCategoryCreate}
              fetchCategories={this.fetchCategories}
              onNewLocationClick={this.onNewLocationClick}
              setNewLocation={this.setNewLocation}
              _prev={this._prev}
            />
          )}

          {this.nextButton(disabled, btnClass)}
          <div className="clear-both"></div>
        </form>
      </React.Fragment>
    );
  }
}

class Step2 extends React.Component {
  constructor(props) {
    // console.log(props);
    super(props);

    const { locationKnown } = props.state;
    const zoom = locationKnown ? props.state.map.zoom : 6;

    this.state = {
      nearbyLocations: null,
      draggable: !props.locationKnown,
      marker: {
        lat: 52.243712,
        lng: 5.4411363,
      },
      zoom,
      loadingNearbyLocations: false
    };
  }

  displayLocations = async (lat, lng) => {
    const nearbyLocations = await this.props.findNearbyLocations(lat, lng, "", 1);
    if (nearbyLocations === null) {
      this.props.setNewLocation();
    }
    this.setState({ nearbyLocations, loadingNearbyLocations: false });
  };

  async componentDidMount() {
    if (this.props.currentStep == 2) {
      // console.log("mounting");
      const { locationKnown } = this.props.state;
      if (locationKnown) {
        // console.log("location known");
        const { latitude, longitude } = this.props.state.photo;
        // console.log("getting long lat", latitude, longitude);
        this.props.updateNewLocationCoords(latitude, longitude);
        this.displayLocations(latitude, longitude);
        this.setState({
          marker: { lat: latitude, lng: longitude },
        });
      }
      this.props.fetchCategories();
    }
  }

  refmarker = React.createRef();
  map = React.createRef();

  updatePosition = () => {
    const marker = this.refmarker.current;
    const map = this.map.current;
    if (marker != null) {
      // console.log("updating position", marker.leafletElement.getLatLng());
      this.setState({
        marker: marker.leafletElement.getLatLng(),
        zoom: map.leafletElement.getZoom(),
        loadingNearbyLocations: true,
      });
    }
    this.displayLocations(this.state.marker.lat, this.state.marker.lng);
    // console.log(
    //   marker.leafletElement.getLatLng().lat,
    //   marker.leafletElement.getLatLng().lng
    // );
    this.props.updateNewLocationCoords(
      marker.leafletElement.getLatLng().lat,
      marker.leafletElement.getLatLng().lng
    );
  };

  onChange = (e) => {
    this.props.onChange(e, "location");
  };

  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    const {
      locationCategoryValues,
      location_categories,
      newLocation,
      monthValues,
      loading,
      location,
      selectedLocation,
      uploadPercentage
    } = this.props.state;
    const { marker } = this.state;
    const position = [marker.lat, marker.lng];

    const { nearbyLocations, zoom, loadingNearbyLocations } = this.state;

    const disabled = newLocation && (!location.hasOwnProperty('title') || location.title == '');

    console.log(uploadPercentage, uploadPercentage + "%");

    return (
      <div className="form-group">
        <h2>Waar heb je de foto gemaakt?</h2>
        <Map
          className="map"
          id="photoLocation"
          center={position}
          zoom={zoom}
          ref={this.map}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            ref={this.refmarker}
            draggable={this.state.draggable}
            onDragend={this.updatePosition}
          >
            <Popup>Foto locatie</Popup>
          </Marker>
        </Map>

        {loadingNearbyLocations && <FaSpinner />}
        {nearbyLocations && !newLocation && (
          <div>
            <div className="my-2 font-bold">Bedoel je misschien deze locatie?</div>
            <div className="flex flex-wrap">
              {nearbyLocations.map(
                (location) =>
                  location.photos.length > 0 && (
                    <LocationCard
                      activeLocation={this.props.activeLocation}
                      key={location.id}
                      location={location}
                      onClick={this.props.onLocationSelect}
                    />
                  )
              )}
            </div>
            <div
              onClick={this.props.onNewLocationClick}
              className="rounded bg-blue-500 text-white w-full p-2 text-center cursor-pointer hover:bg-blue-600"
            >
              Nee, nieuwe locatie toevoegen
            </div>
          </div>
        )}
        {newLocation && (
          <React.Fragment>
            <h2 className="mt-4 mb-2">Nieuwe locatie toevoegen</h2>
            <input
              type="text"
              name="title"
              placeholder="Titel"
              onChange={this.onChange}
            />
            <textarea
              type="text"
              name="desc"
              onChange={this.onChange}
              placeholder="Beschrijving van de locatie"
            />
            <textarea
              type="text"
              name="directions"
              onChange={this.onChange}
              placeholder="Beste manier om hier naar toe te reizen? Is bijvoorbeeld er een parkeerplaats dichtbij, stopt er een bus?"
            />
            <textarea
              type="text"
              name="whattoshoot"
              onChange={this.onChange}
              placeholder="Tips en advies, wat kan je fotograferen op deze locatie?"
            />
            <Select
              components={animatedComponents}
              closeMenuOnSelect={false}
              className="mb-2"
              isMulti
              options={monthValues}
              placeholder="Beste maand om te fotograferen"
              onChange={(e) => {
                this.props.handleSelect(e, "months");
              }}
            />
            <CreatableSelect
              components={animatedComponents}
              isMulti
              onChange={(e) => {
                this.props.handleSelect(e, "location_categories");
              }}
              options={locationCategoryValues}
              placeholder="Categorieën"
              value={location_categories}
              onCreateOption={this.props.onCategoryCreate}
              formatCreateLabel={(label) => `Maak nieuwe categorie: "${label}`}
            />
          </React.Fragment>
        )}

        <div className="flex mt-4">
          <button
            className="block px-4 py-2 my-2 text-white rounded text-l bg-gray-700"
            type="button"
            onClick={this.props._prev}
          >
            Vorige
          </button>

          {(selectedLocation || newLocation) && <button
            type="submit"
            className={"block px-4 py-2 my-2 text-white rounded text-l ml-auto " +
              (loading || disabled ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600')}
            disabled={loading || disabled}
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Uploaden'}
          </button>}
        </div>

        {loading && <div className="shadow w-full bg-grey-light">
          <div
            className="bg-blue-500 text-xs leading-none py-1 text-center text-black"
            style={{ width: uploadPercentage + "%" }}
          >
            {uploadPercentage + "%"}
          </div>
        </div>}

      </div>
    );
  }
}
