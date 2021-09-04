import React, { useState, useEffect } from "react";
import Joi from "@hapi/joi";
import Link from "next/link";
import auth from "../services/authService";
import Input from "../components/shared/Input";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";
import Head from "next/head";
import graphQLFetch from "../graphQLFetch.js";
import UserProfilePicture from "../components/shared/UserProfilePicture";

const Login = (props) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { featuredPhoto } = props;

  let featuredPhotoUrl = featuredPhoto.photo[0].formats?.medium?.url || featuredPhoto.photo[0].formats?.medium?.large || featuredPhoto.photo[0].url;

  const checkRedirect = async () => {
    const user = await auth.getCurrentUser();
    if (user) {
      router.push("/");
    }
  };

  useEffect(() => {
    checkRedirect();
  }, []);

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": `Vul je je email nog even in? 😉.`,
        "any.required": `Vul je je email nog even in? 😉.`,
        "string.email": `Vul je een geldig adres in? 😉.`,
      }),
    password: Joi.string().required().messages({
      "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
      "any.required": `Vul je je wachtwoord nog even in? 😉.`,
    }),
  };

  const loginUser = async () => {
    let input = { ...data };

    Object.defineProperty(
      input,
      "identifier",
      Object.getOwnPropertyDescriptor(input, "email")
    );
    delete input["email"];

    // console.log(input);

    const loggedIn = await auth.login(input);
    // console.log("loggedIn", loggedIn);

    if (loggedIn === true) {
      window.location = "/";
    } else {
      setLoginError(true);
      setLoading(false);
    }
  };

  const doSubmit = () => {
    setLoading(true);
    // call server
    // redirect user to homepage
    // console.log("submitted");
    loginUser();
  };

  const validateProperty = ({ name, value }) => {
    // console.log(name, value);
    const object = { [name]: value };
    // console.log(schema);
    const _schema = Joi.object({ [name]: schema[name] });
    const result = _schema.validate(object);
    // console.log(result);
    const error = result.error;
    // console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false, allowUnknown: true };
    const _schema = Joi.object({ ...schema });
    const { error } = _schema.validate(data, options);
    // console.log(error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

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
        <title>Inloggen bij Spotshare</title>
        <meta name="title" content="Inloggen bij Spotshare" />
        <meta
          name="description"
          content="Login bij Spotshare, vind de mooiste fotolocaties en deel je beste foto's!"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.spotshare.nl/inloggen" />
        <meta property="og:title" content="Inloggen bij Spotshare" />
        <meta
          property="og:description"
          content="Login bij Spotshare, vind de mooiste fotolocaties en deel je beste foto's!"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.spotshare.nl/inloggen"
        />
        <meta property="twitter:title" content="Inloggen bij Spotshare" />
        <meta
          property="twitter:description"
          content="Login bij Spotshare, vind de mooiste fotolocaties en deel je beste foto's!"
        />
      </Head>
      <div className="block sm:flex">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
        >
          <h1 className="font-bold text-xl text-green-500 text-center">
            Inloggen bij Spotshare
          </h1>

          <div className="p-4 rounded border border-blue-400 bg-blue-100 text-blue-500  mt-2 text-center">
            <span className="font-bold mb-2">
              Voor het eerst inloggen op de nieuwe website?
            </span>
            <Link href="/wachtwoord-vergeten">
              <a className="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-600">
                Stel eenmalig je wachtwoord opnieuw in via 'wachtwoord
                vergeten'!
              </a>
            </Link>
          </div>

          <div className="p-4 rounded border border-yellow-400 bg-yellow-100 text-yellow-500 font-bold my-4 text-center">
            We hebben ervoor gekozen 'Inloggen met Facebook' niet meer aan te
            bieden vanwege de veiligheid van jouw privacy.
            <Link href="/wachtwoord-vergeten">
              <a className="inline-block align-baseline  text-sm text-blue-500 hover:text-blue-600">
                Je kunt via 'wachtwoord vergeten' een wachtwoord instellen met
                het emailadres dat aan je facebook account gekoppeld was.
              </a>
            </Link>
          </div>

          {loginError && <ErrorBox />}
          {renderInput("email", "Email", "Emailadres")}
          {renderInput(
            "password",
            "Wachtwoord",
            "Vul je wachtwoord in",
            "password"
          )}
          <div className="flex items-center justify-between">
            <div>{renderButton("Log in", loading)}</div>
          </div>
          <div className="flex items-center justify-center">
            <Link href="/wachtwoord-vergeten">
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 mr-4">
                Wachtwoord vergeten?
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

export default Login;

const ErrorBox = () => {
  return (
    <div className="p-4 rounded border border-red-500 bg-red-200 text-red-500 font-bold my-4">
      Gebruikersnaam of wachtwoord is onbekend.{" "}
      <Link href="/wachtwoord-vergeten">
        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600 ml-4">
          Wachtwoord vergeten?
        </a>
      </Link>
    </div>
  );
};

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
