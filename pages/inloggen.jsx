import React, { useState } from "react";
import Joi from "@hapi/joi";
import Link from "next/link";
import auth from "../services/authService";
import Input from "../components/shared/Input";
import { FaSpinner } from "react-icons/fa";

const Login = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);

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

    console.log(input);

    const loggedIn = await auth.login(input);
    console.log("loggedIn", loggedIn);

    if (loggedIn === true) {
      window.location = "/";
    } else {
      setLoginError(true);
    }
  };

  const doSubmit = () => {
    // call server
    // redirect user to homepage
    console.log("submitted");
    loginUser();
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
            Inloggen bij Spotshare
          </h1>

          {loginError && <ErrorBox />}
          {renderInput("email", "Email", "Emailadres")}
          {renderInput(
            "password",
            "Wachtwoord",
            "Vul je wachtwoord in",
            "password"
          )}
          <div className="flex items-center justify-between">
            <div>{renderButton("Log in")}</div>
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
