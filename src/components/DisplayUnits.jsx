import React, { useState } from "react";
import "./DisplayUnits.css";
import custom from "../assets/custom.png";
import pils from "../assets/pils.png";
import vin from "../assets/vin.png";
import shot from "../assets/shot.png";

const illustrations = { custom, pils, vin, shot };

const DisplayUnits = ({ units, deleteUnit, promille }) => {
  const [deleteMode, toggleDeleteMode] = useState(false);

  return (
    <div className="units__display">
      {promille > 0 && (
        <div>
          {deleteMode ? (
            <p className="units__edit" onClick={() => toggleDeleteMode(false)}>
              ← Gå tilbake
            </p>
          ) : (
            <p className="units__edit" onClick={() => toggleDeleteMode(true)}>
              Slett en enhet
            </p>
          )}
        </div>
      )}
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
          {deleteMode && (
            <p
              onClick={() => {
                deleteUnit(unit);
                toggleDeleteMode(false);
              }}
            >
              Slett
            </p>
          )}
        </section>
      ))}
    </div>
  );
};

export default DisplayUnits;
