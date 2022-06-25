import React from "react";
import "./DisplayUnits.css";
import custom from "../assets/custom.png";
import pils from "../assets/pils.png";
import vin from "../assets/vin.png";
import shot from "../assets/shot.png";

const illustrations = { custom, pils, vin, shot };

const DisplayUnits = ({ units }) => {
  return (
    <div className="units__display">
      {units.map((unit) => (
        <section
          key={String(Math.random() * 1)}
          className="units__display--unit"
        >
          <p>{unit?.time?.time}</p>
          <img
            className="units__display--unit-illustration"
            src={illustrations[unit?.unitName]}
            alt=""
          />
        </section>
      ))}
    </div>
  );
};

export default DisplayUnits;
