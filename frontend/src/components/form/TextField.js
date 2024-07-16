import React from "react";

const TextField = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  color = "black",
  date,
  id,
  checked,
  children,
  label,
  required = false,
  error,
  width,
}) => {
  let styles = {
    color: color,
    width: `${width}px`,
  };

  const inputChangeHandler = (event) => {
    onChange(event);
  };

  return (
    <div className="flex flex-col justify-start gap-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-600 relative"
        >
          {label}
        </label>
      )}
      <div className="flex flex-col justify-between">
        <input
          type={type}
          name={name}
          value={value}
          checked={checked}
          style={styles}
          date={date}
          id={id}
          placeholder={placeholder}
          onChange={inputChangeHandler}
          className=" p-2 border border-2 border-gray-300 rounded-lg"
        />
        {children}
        {error && (
          <p className="text-red-500 text-xs" style={{ width: `${width}px` }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextField;