import React from "react";
import "./DisplayUser.css";

const DisplayUser = ({ gutt }) => {
  const { name, src, promille } = gutt;
  return (
    <div className="user__display">
      <h3>{name}</h3>
      <img className="user__display--img" src={src} alt={name} />
      <h2>{promille}</h2>
    </div>
  );
};

export default DisplayUser;
