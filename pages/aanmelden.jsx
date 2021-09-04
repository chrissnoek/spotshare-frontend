import React, { useState, useEffect } from "react";
import Joi from "@hapi/joi";
import Link from "next/link";
import auth from "../services/authService";
import { FaFacebook } from "react-icons/fa";
import slugify from "slugify";
import Input from "../components/shared/Input";
import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/router";
import Head from "next/head";
import graphQLFetch from "../graphQLFetch.js";
import UserProfilePicture from "../components/shared/UserProfilePicture";

const RegisterForm = (props) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
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
        "string.empty": `Vul je je email nog even in? 😉`,
        "any.required": `Vul je je email nog even in? 😉`,
        "string.email": `Vul je een geldig adres in? 😉`,
        "any.invalid": `Dit email adres is al ingebruik.`,
      }),
    password: Joi.string().required().messages({
      "string.empty": `Vul je je wachtwoord nog even in? 😉`,
      "any.required": `Vul je je wachtwoord nog even in? 😉`,
    }),
    firstname: Joi.string().required().messages({
      "string.empty": `Vul je je voornaam nog even in? 😉`,
      "any.required": `Vul je je voornaam nog even in? 😉`,
    }),
    lastname: Joi.string().required().messages({
      "string.empty": `Vul je je achternaam nog even in? 😉`,
      "any.required": `Vul je je achternaam nog even in? 😉`,
    }),
    username: Joi.string().regex(/^\S*$/).required().messages({
      "string.empty": `Vul je je gebruikersnaam nog even in? 😉`,
      "any.required": `Vul je je gebruikersnaam nog even in? 😉`,
      "string.pattern.base": "Gebruikersnaam kan geen spaties bevatten",
    }),
  };

  const doSubmit = () => {
    setLoading(true);
    // call server

    // redirect user to homepage
    createUser();
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

  const onInputBlur = async (type) => {
    // get the email entered
    const value = data[type];

    // do a query to db to check if email is available
    let valueObj = {};
    valueObj[type] = value;
    const available = await auth.checkAvailability(type, valueObj);

    // if email already exists, add error to email
    if (!available) {
      const _errors = { ...errors };
      const errorMessage = `${type.charAt(0).toUpperCase() + type.slice(1)
        } is al in gebruik.`;
      _errors[type] = errorMessage;

      setErrors(_errors);

      // else, email doesnt exists, validate property if there is a correct email and set errors if they exist
    } else {
      const _errors = { ...errors };
      const errorMessage = validateProperty({
        name: type,
        value: value,
      });
      if (errorMessage) _errors[type] = errorMessage;
      else delete _errors[type];

      setErrors(_errors);
    }
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

  const createUser = async () => {
    let input = { ...data };
    // input["role"] = "5eef1a60e3b96d29e2d1d1ac";

    // check if slug is available, if not, add number
    input["slug"] = slugify(input.username, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
    });

    // console.log({ input: input });

    const registered = await auth.register({ input: input });

    if (registered === true) {
      window.location = "/";
    } else {
      setLoading(false);
      // console.log(registered);
    }
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

  return (
    <div>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>Aanmelden bij Spotshare</title>
        <meta name="title" content="Aanmelden bij Spotshare" />
        <meta
          name="description"
          content="Meld je aan bij Spotshare, vind de mooiste fotolocaties en deel je beste foto's!"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.spotshare.nl/aanmelden" />
        <meta property="og:title" content="Aanmelden bij Spotshare" />
        <meta
          property="og:description"
          content="Meld je aan bij Spotshare, vind de mooiste fotolocaties en deel je beste foto's!"
        />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.spotshare.nl/aanmelden"
        />
        <meta property="twitter:title" content="Aanmelden bij Spotshare" />
        <meta
          property="twitter:description"
          content="Meld je aan bij Spotshare, vind de mooiste fotolocaties en deel je beste foto's!"
        />
      </Head>
      <div className="block sm:flex">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col"
        >
          <h1 className="font-bold mb-6 text-2xl text-green-500 text-center">
            Welkom bij Spotshare
          </h1>
          {/* <a
            className="py-3 bg-blue-500 rounded text-white flex justify-center items-center hover:pointer hover:bg-blue-600"
            href="https://d3bdf895b473.ngrok.io/connect/facebook"
          >
            <FaFacebook className="mr-2" /> Registreer met Facebook
          </a> */}

          {/* <div className="flex my-4 justify-center items-center">
            <hr className="w-full border-gray-400 mt-0" />
            <div className="mx-4 text-center text-gray-500">Of</div>
            <hr className="w-full border-gray-400 mt-0" />
          </div> */}

          <div className="flex">
            {renderInput(
              "firstname",
              "Voornaam",
              "Voornaam",
              "text",
              "w-1/2 mr-2"
            )}
            {renderInput(
              "lastname",
              "Achternaam",
              "Achternaam",
              "text",
              "w-1/2"
            )}
          </div>

          {renderInput(
            "username",
            "Gebruikersnaam",
            "Gebruikersnaam",
            "text",
            "w-full",
            () => {
              onInputBlur("username");
            }
          )}
          {renderInput("email", "Email", "Emailadres", "text", "w-full", () => {
            onInputBlur("email");
          })}
          {renderInput(
            "password",
            "Wachtwoord",
            "Vul je wachtwoord in",
            "password"
          )}

          <div className="flex items-center justify-between">
            {renderButton("Kom bij de club!", loading)}
          </div>
          <div className="flex justify-center itemst-center w-full">
            <span className="text-gray-600 text-center text-sm mr-2 block">
              Heb je al een account?
            </span>

            <Link href="/inloggen">
              <a className="block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600">
                Inloggen
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

export default RegisterForm;

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
