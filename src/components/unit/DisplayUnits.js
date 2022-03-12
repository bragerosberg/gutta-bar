import React from "react";

const DisplayUnits = ({ units }) => {
  return (
    <ul>
      {units.map((entry) => {
        return (
          <li key={entry.id}>
            <p>
              {entry.name} - {entry.alchP}% @ {entry.time}
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default DisplayUnits;
