import React from "react";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";
import custom from "../../assets/custom.png";
import pils from "../../assets/pils.png";
import shot from "../../assets/shot.png";
import vin from "../../assets/vin.png";
import "./AddUnit.css";

const AddUnit = ({ handleSubmit }) => {
  return (
    <div>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 330,
            alchP: 4.7,
            name: "0.33 shot",
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
        <img src={custom} className="unitImage" alt="test" />
        TODO: Custom
      </button>
    </div>
  );
};

export default AddUnit;
