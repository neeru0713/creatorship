import React from "react";

const Button = ({
  width,
  color = "white",
  name,
  bgColor,
  type,
  icon,
  textAlignment = "center",
  onClick,
}) => {
  let styles = {
    textAlign: textAlignment,
  };

  if (type === "primary") {
    styles = {
      ...styles,
      background: "#1b73e8",
      color: "white",
      width: `${width}px`,
    };
  } else if (type === "secondary") {
    styles = {
      ...styles,
      background: "#e9edf1",
      color: "black",
      width: `${width}px`,
    };
  }

  return (
    <button
      className="relative button rounded-md px-3 py-3 text-md"
      style={styles}
      onClick={onClick}
    >
      {name}
      {icon && (
        <span className="ml-2 absolute right-[4px] top-[12px]">{icon}</span>
      )}
    </button>
  );
};

export default Button;