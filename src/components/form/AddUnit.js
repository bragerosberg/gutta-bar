import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";
import custom from "../../assets/custom.png";
import pils from "../../assets/pils.png";
import shot from "../../assets/shot.png";
import vin from "../../assets/vin.png";
import "./AddUnit.css";

const AddUnit = ({ handleSubmit }) => {
  const [customUnit, toggleCustomUnit] = useState(false);
  const [customUnitEntry, setCustomUnitEntry] = useState({
    milliLiter: 0,
    alchP: 0,
    name: "Skriv navn her",
  });

  const handleChange = ({ target }) => {
    const { value, name } = target;
    switch (name) {
      case "name":
        setCustomUnitEntry({ ...customUnitEntry, name: value });
        break;
      case "milliLiter":
        setCustomUnitEntry({ ...customUnitEntry, milliLiter: value });
        break;
      case "alchP":
        setCustomUnitEntry({ ...customUnitEntry, alchP: value });
        break;
      default:
        console.log("Category of submission is not supported");
    }
  };

  return (
    <div>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 330,
            alchP: 4.7,
            name: "0.33 pils",
            time: format(new Date(), "HH:mm"),
            date: format(new Date(), "dd-MM-yyyy"),
          })
        }
      >
        <img src={pils} className="unitImage" alt="test" />
        330ml pils
      </button>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 500,
            alchP: 4.7,
            name: "0.5 pils",
            time: format(new Date(), "HH:mm"),
            date: format(new Date(), "dd-MM-yyyy"),
          })
        }
      >
        <img src={pils} className="unitImage" alt="test" />
        500ml pils
      </button>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 40,
            alchP: 40,
            name: "40% shot",
            time: format(new Date(), "HH:mm"),
            date: format(new Date(), "dd-MM-yyyy"),
          })
        }
      >
        <img src={shot} className="unitImage" alt="test" />
        40% shot
      </button>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 150,
            alchP: 12,
            name: "Et glass vin",
            time: format(new Date(), "HH:mm"),
            date: format(new Date(), "dd-MM-yyyy"),
          })
        }
      >
        <img src={vin} className="unitImage" alt="test" />
        Et glass vin
      </button>
      <button onClick={() => toggleCustomUnit(!customUnit)}>
        <img src={custom} className="unitImage" alt="test" />
        Annet
      </button>
      {customUnit && (
        <div>
          <form
            className="customUnit__form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit({
                id: uuidv4(),
                milliLiter: customUnitEntry.milliLiter,
                alchP: customUnitEntry.alchP,
                name: customUnitEntry.name,
                time: format(new Date(), "HH:mm"),
                date: format(new Date(), "dd-MM-yyyy"),
              });
            }}
          >
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={customUnitEntry.name}
              onChange={handleChange}
            />
            <label htmlFor="alchP">Prosent</label>
            <input
              id="alchP"
              name="alchP"
              type="number"
              value={customUnitEntry.alchP}
              onChange={handleChange}
            />
            <label htmlFor="milliLiter">Volume in ml</label>
            <input
              id="milliLiter"
              name="milliLiter"
              type="number"
              value={customUnitEntry.milliLiter}
              onChange={handleChange}
            />
            <input type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default AddUnit;
