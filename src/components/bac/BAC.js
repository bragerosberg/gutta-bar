import React from "react";
import "./bac.css";

const BAC = ({ bac }) => {
  return <>{bac > 0 && <h1 className="bac">{bac.toFixed(2)}</h1>}</>;
};

export default BAC;
