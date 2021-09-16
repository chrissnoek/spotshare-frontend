import React, { Component, useEffect, useState } from "react";
import graphQLFetch from "../../../graphQLFetch.js";
import { FaUserSecret } from "react-icons/fa";
import Form from "../../../components/shared/Form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Joi from "@hapi/joi";
import slugify from "slugify";
import { useRouter } from "next/router";
import Head from "next/head";
import { userContext } from "../../../services/userContext.js";

const MyClassWithRouter = (props) => {
  const [isServer, setIsServer] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsServer(false);
  }, []);


  {
    return !isServer ?
      (<userContext.Consumer>
        {(value) => {
          console.log('value', value);
          if (value.user) {
            if (value.user.id) {
              return <DataEdit {...props} router={router} userId={value.user.id} />;
            } else {
              return <DataEdit {...props} router={router} userId={null} />;
            }
          } else {
            return <DataEdit {...props} router={router} userId={null} />;
          }
        }}
      </userContext.Consumer>)
      : <DataEdit {...props} router={router} userId={null} />;
  }



};
export default MyClassWithRouter;

class DataEdit extends Form {
  async fetchData(match, search, showError) {
    const query = `query data($slug: String!) {
            users( where: { slug: $slug } ) {
              username
			        email
              id
              firstname
              lastname
              location
              slug
              website
              fb_page
              insta_page
              profilePicture {
                url
              }
            }
          }`;

    const { data: slug } = this.props;
    const result = await graphQLFetch(query, { slug }, true);
    // console.log(result);
    return result;
  }

  async loadData() {
    // provide the query with the variables
    const result = await this.fetchData();

    if (result) {
      this.setState({ data: result.users[0] });
    }
  }

  componentDidMount() {
    const { data } = this.state;
    const { userId } = this.props;
    this.setState({ userId });

    if (data === null) {
      this.loadData();
    }
  }

  componentDidUpdate() {
    if (this.state.userId !== this.props.userId) {
      this.setState({ userId: this.props.userId });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      data: null,
      errors: {},
      photoLoading: false,
      tempFile: null,
      saving: false,
    };
    this.fileInput = React.createRef();
  }

  // componentDidUpdate() {
  //   if (this.state.data !== this.props.data) {
  //     this.setState({ data: this.props.data });
  //   }
  // }

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "any.empty": `Vul je je email nog even in? 😉`,
        "any.required": `Vul je je email nog even in? 😉`,
        "string.email": `Vul je een geldig adres in? 😉`,
        "any.invalid": `Dit email adres is al ingebruik.`,
      }),
    firstname: Joi.string().allow(null, ""),
    lastname: Joi.string().allow(null, ""),
    username: Joi.string().regex(/^\S*$/).required().messages({
      "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
      "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
      "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten",
    }),
    location: Joi.string().allow(null, ""),
    website: Joi.string().allow(null, ""),
    fb_page : Joi.string().allow(null, ""),
    insta_page : Joi.string().allow(null, ""),
  };

  uploadFile = (file, redirect, newSlug) => {
    const formData = new FormData();

    formData.append(`files`, file, file.name);
    formData.append("ref", "user");
    formData.append("source", "users-permissions"); // Plugin name.
    formData.append("field", "profilePicture");
    formData.append("refId", this.state.data.id);

    const request = new XMLHttpRequest();
    request.open("POST", `https://spotshare-strapi.herokuapp.com/upload`);
    request.send(formData);
    request.addEventListener("load", redirect(newSlug));
  };

  async doSubmit(e) {
    this.setState({ saving: true });
    const {
      blob: uploadedFile,
      data: { username, id: userId },
    } = this.state;

    const redirect = (slug) => {
      //if the query returns an id in data, the photo is created
      // redirect to created photo
      const doRedirect = () => {
        this.props.router.push(`/fotograaf/${slug}`);
      };
      setTimeout(doRedirect, 2000);
      //window.location = `/fotograaf/${slug}`;
    };

    // update the fields
    const query = `
      mutation updateUser($input:updateUserInput) {
        updateUser(input: $input) {
          user {
            slug
          }
        }
      }`;

    const variables = {
      input: {
        where: {
          id: userId,
        },
        data: {
          ...this.state.data,
        },
      },
    };

    delete variables.input.data.profilePicture;
    delete variables.input.data.id;

    variables.input.data.slug = slugify(username, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    const data = await graphQLFetch(query, variables, true);

    if (data.updateUser) {
      if (uploadedFile !== null && uploadedFile !== undefined) {
        // console.log("in upload file");
        this.uploadFile(uploadedFile, redirect, data.updateUser.user.slug);
      } else {
        // console.log("straight to redirect");
        redirect(data.updateUser.user.slug);
      }
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
  };

  removeImage = () => {
    // console.log("remove");
    this.setState({
      tempFile: null,
      photo: {},
      blob: null,
    });
  };

  render() {
    const { data, photoLoading, tempFile, userId } = this.state;
    if (data === null || data.id !== userId) {
      // console.log("return null from render");
      return null;
    }


    return (
      <form
        name="profileEdit"
        encType="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        <Head>
          <meta name="robots" content="noindex,nofollow,noarchive" key="robots" />
        </Head>
        {photoLoading && (
          <AiOutlineLoading3Quarters className="fill-current text-green-500" />
        )}

        <div className="p-6">
          <div className="flex flex-col justify-center items-center mb-4 relative cursor-pointer">
            <input
              type="file"
              name="blob"
              ref={this.fileInput}
              onChange={this.onFileChange}
              onDrop={this.handleOnDrop}
              onDragOver={this.handleOnDragOver}
              onDragLeave={this.handleOnDragLeave}
              className="absolute m-0 p-0 w-full h-full outline-none pointer opacity-0 top-0 left-0"
            />

            {tempFile ? (
              <div
                id="imagePreview"
                className="relative h-16 w-16 overflow-hidden rounded-full mb-2"
              >
                {/* <div
                      onClick={this.removeImage}
                      className="border border-gray-600 rounded p-4 m-4 absolute top-0 right-0 cursor-pointer bg-black opacity-50 hover:opacity-100"
                    >
                      <FiTrash2 className="stroke-current text-gray-100" />
                    </div> */}
                <img
                  src={tempFile}
                  id="output_image"
                  className="w-auto h-16 rounded-full mb-2"
                />
              </div>
            ) : data.profilePicture !== null &&
              data.profilePicture !== undefined ? (
              <div
                id="imagePreview"
                className="relative h-16 w-16 overflow-hidden rounded-full mb-2"
              >
                <img
                  className="w-auto h-16 rounded-full mb-2"
                  src={data.profilePicture.url}
                ></img>
              </div>
            ) : (
              <div className="fill-current h-16 w-16 mr-4 mb-auto text-white bg-gray-500  rounded-full flex items-center justify-center">
                <FaUserSecret className="text-2xl" />
              </div>
            )}

            <span className="font-bold text-blue-500">
              Profielfoto veranderen
            </span>
          </div>

          <div className="flex flex-col w-full">
            {this.renderInput(
              "username",
              "Gebruikersnaam",
              "Gebruikersnaam",
              "text"
            )}
            {this.renderInput("email", "Email", "Email", "text")}
            {this.renderInput("firstname", "Voornaam", "Voornaam", "text")}
            {this.renderInput("lastname", "Achternaam", "Achternaam", "text")}
            {this.renderInput("location", "Woonplaats", "Woonplaats", "text")}
            {this.renderInput("website", "Website", "Website", "text")}
            {this.renderInput("fb_page", "Facebook", "Facebook", "text")}
            {this.renderInput("insta_page", "Instagram", "Instagram", "text")}
          </div>
          {this.renderButton("Profiel opslaan", this.state.saving)}
        </div>
      </form>
    );
  }
}

// export async function getStaticPaths() {
//   // build the graphql query
//   const query = `query profile {
//     users {
//       username
//     }
//   }`;

//   const vars = {};
//   const result = await graphQLFetch(query, vars, true);

//   const paths = result.users.map((user) => ({
//     params: { username: user.username.toString() },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  // build the graphql query
  const query = `query data($slug: String!) {
    users( where: { slug: $slug } ) {
      username
      email
      id
      firstname
      lastname
      location
      website
      fb_page
      insta_page
      profilePicture {
        url
      }
    }
  }`;

  const { slug } = params;

  const result = await graphQLFetch(query, { slug }, true);
  // console.log("result", result);

  return {
    props: {
      data: slug,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    // revalidate: 60, // In seconds
  };
}
