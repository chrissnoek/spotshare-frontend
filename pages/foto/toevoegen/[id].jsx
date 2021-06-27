/* globals React */
import React from "react";
import graphQLFetch from "../../../graphQLFetch";
import EXIF from "exif-js";
import exifr from "exifr";
import slugify from "slugify";
import AddPhoto from "../../../components/shared/AddPhoto";
import { userContext } from "../../../services/userContext";
import { useRouter } from "next/router";

const MyClassWithRouter = (props) => {
  const router = useRouter();
  return <PhotoAddToLocation {...props} router={router} />;
};
export default MyClassWithRouter;

class PhotoAddToLocation extends React.Component {
  redirect = (slug) => {
    //if the query returns an id in data, the photo is created
    // redirect to created photo
    this.props.router.push(`/foto/${slug}`);
  };

  fetchLocation = async () => {
    const query = `query location($id:ID!) {
            location(id:$id) {
              title
              id
              slug
            }
          }`;

    const id = this.props.router.query.id;

    const data = await graphQLFetch(query, { id }, true);
    console.log(data);
    return data;
  };

  // we are rendering the actual component to have access to the Context
  // outside of the renderfunction in the next component
  // We have to pass functions to make use of the router functionality

  render() {
    return (
      <userContext.Consumer>
        {(value) => {
          console.log(value);
          return (
            <MapElement
              value={value}
              redirect={this.redirect}
              fetchLocation={this.fetchLocation}
            />
          );
        }}
      </userContext.Consumer>
    );
  }
}

class MapElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: {},
      photoLoading: false,
      tempFile: null,
      onDrop: false,
      onDragOver: false,
      uploadPercentage: 0,
      invalidFields: {},
      blob: null,
      location: null,
    };
    this.fileInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(props);
  }

  componentDidUpdate(prevProps) {
    console.log("update");
    const {
      value: { user: prevUser },
    } = prevProps;
    const {
      value: { user },
    } = this.props;
    console.log(prevUser, user);
    if (prevUser !== user) {
      console.log("updating context");
      this.updateContext();
    }
  }

  updateContext() {
    this.setState((prevState) => ({
      ...prevState,
      photo: { ...prevState.photo, user: this.props.value.user.id },
    }));
  }

  async componentDidMount() {
    console.log(this.props.value);

    const data = await this.props.fetchLocation();
    if (data) {
      console.log("props from mount", this.props);
      this.setState({
        location: data.location,
        photo: { location: data.location.id, user: this.props.value.id },
      });
    } else {
      this.setState({ location: null });
    }
  }

  async handleSubmit(e) {
    console.log("submitted");
    e.preventDefault();
    e.persist();
    updateContext();

    const {
      blob,
      newLocation,
      photo: { title },
    } = this.state;

    // check if an image is given, and title, if not show error and return null;
    if (!blob || !title) {
      if (!blob) {
        console.log("no blob in state");
        this.setState((prevState) => ({
          ...prevState,
          invalidFields: {
            ...prevState.invalidFields,
            blob: "Voeg je nog een foto toe? 📸",
          },
        }));
      }
      if (!title) {
        console.log("no title in state.photo");
        this.setState((prevState) => ({
          ...prevState,
          invalidFields: {
            ...prevState.invalidFields,
            title: "Wat is de titel van je foto? 📸",
          },
        }));
      }
      console.log("returning");
      return;
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
          slug: createdSlug,
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
      console.log("photo page created, uploading foto..");
      //after pages is created, use refId to upload files with xhr request

      const redirect = () => {
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
      request.open("POST", `http://localhost:1337/upload`);
      request.send(formData);
      request.addEventListener("load", redirect);
    } else {
      console.log("failed");
    }
  }

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

  handleInputChange = (event, property) => {
    console.log("handling on input chagne");
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState((prevState) => {
      let stateFields;
      if (property === "location") {
        console.log("setting location state");
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
    console.log("remove");
    this.setState({
      tempFile: null,
      photo: {},
      blob: null,
      locationKnown: false,
    });
  };

  handleOnDrop = (e) => {
    console.log("handleOnDrop fired", e);
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
      // slug is available, proceed
      return slug;
    } else {
      // slug is not available, try again

      if (!suffix) {
        suffix = 1;
      } else {
        suffix++;
      }
      var n = str.lastIndexOf(previousSuffix);
      slug.replace(previousSlug, "");

      const createdSuffix = "-" + suffix;
      let adjustedSlug = slug + reactedSlug;
      return this.createSlug(adjustedSlug, suffix, createdSuffix);
    }
  };

  render() {
    const { location } = this.state;
    if (location === null) {
      return null;
    }

    let btnClass = "block px-3 py- my-2 text-white rounded text-l";
    let disabled =
      this.state.photo.title === undefined ||
      this.state.photo.title === "" ||
      this.state.blob === null
        ? true
        : false;
    btnClass += disabled ? " bg-gray-400" : " bg-blue-600";

    return (
      <>
        <form
          name="photoAdd"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
          className="photoAdd block py-3 px-4 border border-gray-300 rounded md:mx-auto md:my-6 md:w-9/12 lg:w-1/2 rounded md:shadow-lg md:p-6"
        >
          <div className="block mb-2">
            <div className="w-full rounded p-2 border">
              <p className="font-bold">
                Foto toevoegen aan locatie: {location.title}
              </p>
            </div>
          </div>
          <AddPhoto
            state={this.state}
            fileInput={this.fileInput}
            onFileChange={this.onFileChange}
            onChange={this.handleInputChange}
            handleOnDrop={this.handleOnDrop}
            handleOnDragOver={this.handleOnDragOver}
            handleOnDragLeave={this.handleOnDragLeave}
            removeImage={this.removeImage}
          />
          <button disabled={disabled} type="submit" className={btnClass}>
            Uploaden
          </button>
        </form>
      </>
    );
  }
}
