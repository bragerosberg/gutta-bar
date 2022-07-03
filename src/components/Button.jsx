import React from "react";
import "./Button.css";

const Button = ({
  onClick,
  children,
  borderColor = "black",
  backgroundColor = "transparent",
  color = "white",
  className = "primaryButton",
  fullWidth = false,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        borderColor,
        backgroundColor,
        color, 
        maxWidth: fullWidth ? "none" : "fit-content",
        width: fullWidth ? "inherit" : "auto",
      }}
    >
      {children}
    </button>
  );
};

export default Button;
