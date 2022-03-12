import React from "react";
import deletePhoto from "../../assets/delete.png";
import "./DisplayUnit.css";

const DisplayUnits = ({ units, removeUnit }) => {
  return (
    <ul className="ul">
      {units.map((entry) => {
        return (
          <li className="unit__list" key={entry.id}>
            <p className="unit__entry">
              {entry.name} - {entry.alchP}% @ {entry.time}
            </p>
            <img
              onClick={() => removeUnit(entry)}
              className="deleteUnit"
              src={deletePhoto}
              alt="delete"
            />
          </li>
        );
      })}
    </ul>
  );
};

export default DisplayUnits;
