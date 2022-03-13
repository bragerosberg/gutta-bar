import React from "react";
import "./bac.css";

const BAC = ({ bac }) => {
  return (
    <>
      {bac <= 0 && <h1 className="bac">Du har null i promille</h1>}
      {bac > 0 && <h1 className="bac">{bac.toFixed(3)}</h1>}
    </>
  );
};

export default BAC;
