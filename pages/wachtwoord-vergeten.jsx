import React, { useState } from "react";
import Joi from "@hapi/joi";
import Input from "../components/shared/Input";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import graphQLFetch from "../graphQLFetch.js";
import UserProfilePicture from "../components/shared/UserProfilePicture";

const ForgotPassword = (props) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { featuredPhoto } = props;

  let featuredPhotoUrl = featuredPhoto.photo[0].formats?.medium?.url || featuredPhoto.photo[0].formats?.medium?.large || featuredPhoto.photo[0].url;


  const handleChange = ({ currentTarget: input }) => {
    const _errors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) _errors[input.name] = errorMessage;
    else delete _errors[input.name];

    const _data = { ...data };
    _data[input.name] = input.value;
    setData(_data);
    setErrors(_errors);

    // setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": `Vul je je email nog even in? 😉.`,
        "any.required": `Vul je je email nog even in? 😉.`,
        "string.email": `Vul je een geldig adres in? 😉.`,
      }),
  };

  const validateProperty = ({ name, value }) => {
    //  console.log(name, value);
    const object = { [name]: value };
    //  console.log(schema);
    const _schema = Joi.object({ [name]: schema[name] });
    const result = _schema.validate(object);
    //  console.log(result);
    const error = result.error;
    //  console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false, allowUnknown: true };
    const _schema = Joi.object({ ...schema });
    const { error } = _schema.validate(data, options);
    //  console.log(error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const doSubmit = async () => {
    // call server
    // redirect user to homepage
    //  console.log("submitted");

    const query = `mutation ForgotPassword($email:String!){
		forgotPassword(email:$email) {
		  ok
		}
	  }`;

    const vars = { email: data.email };

    //  console.log(vars);

    // Request API.
    axios
      .post("https://spotshare-strapi.herokuapp.com/auth/forgot-password", {
        email: data.email, // user's email
      })
      .then((response) => {
        //  console.log(response);
        //  console.log("Your user received an email");
        setSuccess(true);
        setSuccess(false);
        setData({});
      })
      .catch((error) => {
        //  console.log("An error occurred:", error.response);
        setLoading(false);
      });

    // const result = await graphQLFetch(query, vars, true);

    // //  console.log(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validate();
    setErrors(errors || {});
    if (errors) {
      setLoading(false);
      return;
    }

    doSubmit();
  };

  const renderButton = (label, disable = false) => {
    return (
      <button
        className={
          "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" +
          (validate() || Object.keys(errors).length !== 0 || disable
            ? " bg-gray-500 hover:bg-gray-600"
            : " bg-blue-500 hover:bg-blue-600")
        }
        type="submit"
        disabled={validate() || Object.keys(errors).length !== 0 || disable}
      >
        {disable ? <FaSpinner className="animate-spin" /> : label}
      </button>
    );
  };
  const renderInput = (
    name,
    label,
    placeholder,
    type = "text",
    classes = "w-full",
    onBlur = () => { }
  ) => {
    return (
      <Input
        classes={classes}
        name={name}
        label={label}
        value={data[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        error={errors[name]}
        type={type}
        onBlur={onBlur}
      />
    );
  };

  return (
    <div>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title key="title">Wachtwoord vergeten | Spotshare</title>
        <meta
          name="title"
          key="meta_title"
          content="Wachtwoord vergeten | Spotshare"
        />
        <meta
          name="description"
          key="meta_desc"
          content="Wachtwoord vergeten? Vraag hier een reset code aan zodat je een nieuw wachtwoord kunt instellen."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:url"
          key="og_url" content="https://www.spotshare.nl/wachtwoord-vergeten" />
        <meta
          property="og:title"
          key="og_title"
          content="Wachtwoord vergeten | Spotshare"
        />
        <meta
          property="og:description"
          key="og_desc"
          content="Wachtwoord vergeten? Vraag hier een reset code aan zodat je een nieuw wachtwoord kunt instellen."
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:url"
          key="twitter_url" content="https://www.spotshare.nl/wachtwoord-vergeten" />
        <meta
          property="twitter:title"
          key="twitter_title"
          content="Wachtwoord vergeten | Spotshare"
        />
        <meta
          property="twitter:description"
          key="twitter_desc"
          content="Wachtwoord vergeten? Vraag hier een reset code aan zodat je een nieuw wachtwoord kunt instellen."
        />
      </Head>
      <div className="block sm:flex h-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
        >
          {success && (
            <div className="p-4 rounded border border-green-500 bg-green-200 text-green-500 font-bold my-4">
              Er is een email gestuurd om je wachtwoord opnieuw in te stellen!
              (Kijk ook even in je spam folder.)
            </div>
          )}
          <h1 className="font-bold text-xl text-green-500 text-center">
            Wachtwoord resetten
          </h1>

          {loginError && <ErrorBox />}
          {renderInput("email", "Email", "Emailadres")}
          <div className="flex items-center justify-between">
            <div>{renderButton("Wachtwoord resetten", loading)}</div>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/inloggen">
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 mr-4">
                Inloggen
              </a>
            </Link>{" "}
            |
            <Link href="/aanmelden">
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 ml-4">
                Aanmelden
              </a>
            </Link>
          </div>
        </form>

        <div className="w-full relative">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${featuredPhotoUrl})`,
              backgroundSize: `cover`,
              backgroundPosition: `center center`,
            }}
          ></div>
          <div className="hidden md:inline-block rounded-full shadow-lg px-1 py-1 -mt-6 ml-1 bg-white text-black justify-center absolute bottom-6 right-6">
            <div className="flex justify-center items-center ">
              <div className="mr-2">
                <UserProfilePicture profile={featuredPhoto.user} size={3} />
              </div>
              <span className="text-black mr-2 text-xs">
                <span className="text-xl">📸</span>{" "}
                <span className="text-italic">{featuredPhoto.title}</span>
                {" "}door{" "}
                <span className="text-italic">
                  {featuredPhoto.user.firstname} {featuredPhoto.user.lastname}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;


export async function getStaticProps() {
  // console.log(firstID, secondID, thirdID, fourthID, fifthID, sixtID);

  // build the graphql query
  const query = `query {
    featuredPhoto: photos(where:{featured:1}){
      id
      slug
      title
      photo {
        url
        formats
      }
      user {
        id
        username
      firstname
      lastname
        profilePicture {
          url
        }
      }
    }
  }`;

  const result = await graphQLFetch(query, {}, true);
  // console.log("result", result);

  return {
    props: {
      featuredPhoto: result.featuredPhoto[0],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 86400, // In seconds
  };
}
