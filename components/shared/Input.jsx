import React from "react";

const Input = ({ classes, name, label, error, ...rest }) => {
  const className = "mb-2 " + classes;
  return (
    <div className={className}>
      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        id={name}
        name={name}
        {...rest}
      />
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Input;
