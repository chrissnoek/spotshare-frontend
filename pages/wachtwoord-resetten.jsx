import React, { useState, useEffect } from "react";
import Joi from "@hapi/joi";
import Input from "../components/shared/Input";
import { FaSpinner } from "react-icons/fa";
import graphQLFetch from "../graphQLFetch.js";
import { useRouter } from "next/router";
import URLSearchParams from "url-search-params";
import auth from "../services/authService";
import { toast } from "react-toastify";
import axios from "axios";

const PasswordReset = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
  const [code, setCode] = useState();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { query } = router;
    const params = new URLSearchParams(query);
    const _code = params.get("code");
    setCode(_code);
  }, [router]);

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
    password: Joi.string().required().messages({
      "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
      "any.required": `Vul je je wachtwoord nog even in? 😉.`,
    }),
    passwordConfirmation: Joi.string()
      .required()
      .equal(Joi.ref("password"))
      .messages({
        "string.empty": `Vul je je wachtwoord nog even in? 😉.`,
        "any.required": `Vul je je wachtwoord nog even in? 😉.`,
        "any.only": `Moet gelijk zijn 😉.`,
      }),
  };

  const validateProperty = ({ name, value }) => {
    const object = { [name]: value };
    //const _schema = Joi.object({ [name]: schema[name] });

    const _schemaObject = { [name]: schema[name] };

    if (name.endsWith("Confirmation")) {
      const dependentInput = name.substring(0, name.indexOf("Confirmation"));
      object[dependentInput] = data[dependentInput];
      _schemaObject[dependentInput] = schema[dependentInput];
    }

    const _schema = Joi.object(_schemaObject);
    const result = _schema.validate(object);
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

    // const query = `mutation resetPassword($password: String!, $passwordConfirmation: String!, $code: String!){
    //     resetPassword(password:$password, passwordConfirmation:$passwordConfirmation, code:$code) {
    //       jwt
    //     }
    //   }`;

    // const vars = {
    //   password: data.password,
    //   passwordConfirmation: data.passwordConfirmation,
    //   code: code,
    // };

    // console.log(vars);

    //const result = await graphQLFetch(query, vars, true, true);

    // console.log(result);

    axios
      .post("http://localhost:1337/auth/reset-password", {
        code: code, // code contained in the reset link of step 3.
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      })
      .then((response) => {
        console.log(response);
        console.log("Your user's password has been reset.");
        auth.setToken(response.data.jwt);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
        // error message
        console.log("ERROR!");
        toast.error("Je code is verlopen, probeer het opnieuw.");
      });
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
        {success ? (
          <div className="bg-white w-full   px-8 md:px-16 pt-6 md:py-12">
            <h1 className="font-bold text-xl text-green-500 text-center">
              Wachtwoord gewijzigd!
            </h1>
            <div className="p-6 rounded bg-green-100 border border-green-200 mt-4">
              <p className="text-green-500">
                Wachtwoord succesvol gewijzigd.{" "}
                <a className="font-bold" href="/">
                  Klik hier
                </a>{" "}
                om naar je dashboard te gaan!
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full  px-8 md:px-16 pt-6 md:py-12 flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col border"
          >
            <h1 className="font-bold text-xl text-green-500 text-center">
              Wachtwoord resetten
            </h1>

            {loginError && <ErrorBox />}
            {renderInput(
              "password",
              "Wachtwoord",
              "Vul je wachtwoord in",
              "password"
            )}
            {renderInput(
              "passwordConfirmation",
              "Wachtwoord nogmaals",
              "Herhaal je wachtwoord",
              "password"
            )}
            <div className="flex items-center justify-between">
              <div>{renderButton("Wachtwoord resetten")}</div>
            </div>
          </form>
        )}

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

export default PasswordReset;
