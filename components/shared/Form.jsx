import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./Input.jsx";
import { FaSpinner } from "react-icons/fa";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    console.log(input.value);
    const data = { ...this.state.data };
    data[input.name] = input.value;
    console.log(data[input.name]);
    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false, allowUnknown: true };
    const _schema = Joi.object({ ...this.schema });
    const { error } = _schema.validate(this.state.data, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const object = { [name]: value };
    const _schema = Joi.object({ [name]: this.schema[name] });
    const result = _schema.validate(object);
    const error = result.error;
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderButton(label, disable = false) {
    return (
      <button
        className={
          "w-full mb-2 mt-2 text-white flex items-center justify-center font-bold py-2 px-4 rounded" +
          (this.validate() ||
          Object.keys(this.state.errors).length !== 0 ||
          disable
            ? " bg-gray-500 hover:bg-gray-600"
            : " bg-blue-500 hover:bg-blue-600")
        }
        type="submit"
        disabled={
          this.validate() ||
          Object.keys(this.state.errors).length !== 0 ||
          disable
        }
      >
        {disable ? <FaSpinner className="animate-spin" /> : label}
      </button>
    );
  }

  renderInput(
    name,
    label,
    placeholder,
    type = "text",
    classes = "w-full",
    onBlur = () => {}
  ) {
    const { data, errors } = this.state;
    return (
      <Input
        classes={classes}
        name={name}
        label={label}
        value={data[name] || ""}
        onChange={this.handleChange}
        placeholder={placeholder}
        error={errors[name]}
        type={type}
        onBlur={onBlur}
      />
    );
  }
}

export default Form;
