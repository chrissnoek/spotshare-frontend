import React, { useState } from "react";
import Joi from "@hapi/joi";
import Input from "../components/shared/Input";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import graphQLFetch from "../graphQLFetch.js";
import axios from "axios";

const ForgotPassword = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);

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
    console.log(name, value);
    const object = { [name]: value };
    console.log(schema);
    const _schema = Joi.object({ [name]: schema[name] });
    const result = _schema.validate(object);
    console.log(result);
    const error = result.error;
    console.log("returning", error);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const options = { abortEarly: false, allowUnknown: true };
    const _schema = Joi.object({ ...schema });
    const { error } = _schema.validate(data, options);
    console.log(error);
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
    console.log("submitted");

    const query = `mutation ForgotPassword($email:String!){
		forgotPassword(email:$email) {
		  ok
		}
	  }`;

    const vars = { email: data.email };

    console.log(vars);

    // Request API.
    axios
      .post("http://localhost:1337/auth/forgot-password", {
        email: data.email, // user's email
      })
      .then((response) => {
        console.log(response);
        console.log("Your user received an email");
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });

    // const result = await graphQLFetch(query, vars, true);

    // console.log(result);
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
  const renderInput = (
    name,
    label,
    placeholder,
    type = "text",
    classes = "w-full",
    onBlur = () => {}
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
      <div className="block sm:flex">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
        >
          <h1 className="font-bold text-xl text-green-500 text-center">
            Wachtwoord resetten
          </h1>

          {loginError && <ErrorBox />}
          {renderInput("email", "Email", "Emailadres")}
          <div className="flex items-center justify-between">
            <div>{renderButton("Wachtwoord resetten")}</div>
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

        <div className="w-full">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(https://picsum.photos/1500/1500)`,
              backgroundSize: `cover`,
              backgroundPosition: `center center`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
