import React from "react";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";

const AddUnit = ({ handleSubmit }) => {
  return (
    <div>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 330,
            alchP: 4.7,
            name: "0.33 pils",
            time: format(new Date(), "hh:mm"),
            date: format(new Date(), "dd-MM-yyyy"),
          })
        }
      >
        Add 330ml beer
      </button>
      <button
        onClick={() =>
          handleSubmit({
            id: uuidv4(),
            milliLiter: 500,
            alchP: 4.7,
            name: "0.5 pils",
            time: format(new Date(), "hh:mm"),
            date: format(new Date(), "dd-MM-yyyy"),
          })
        }
      >
        Add 500ml beer
      </button>
    </div>
  );
};

export default AddUnit;
