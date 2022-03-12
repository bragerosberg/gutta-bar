import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import format from "date-fns/format";

// TODO
/* 
  - [X] Add option to clear bac
  - [X] Make bac decrease over time
  - [X] Localstorage of choices
  - [X] Add list of bac entries
    - [X] Add time of when it was added
  - [X] Units list to be below add 
  - [] Possibility to add custom unit
  - [] Possibility to remove unit from units
  - [] Icons and images from, 
  - [] History feature
    - [] See previous events, starttime & endtime
*/

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

const Form = ({ addUnit, saveBodyweight }) => {
  const [isReady, toggleIsReady] = useState(
    Boolean(localStorage.getItem("bw"))
  );
  const [bodyweight, setBodyweight] = useState(
    JSON.parse(localStorage.getItem("bw")) || 0
  );

  const handleSubmit = () => {
    localStorage.setItem("bw", JSON.stringify(bodyweight));
    toggleIsReady(true);
    saveBodyweight(bodyweight);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setBodyweight(value);
  };
  return (
    <>
      {!isReady && (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="bw">Vekt</label>
            <input
              id="bw"
              name="bw"
              type="number"
              value={bodyweight}
              onChange={handleChange}
            />
          </form>
          <button onClick={handleSubmit}>Legg til vekt</button>
        </>
      )}
      {isReady && (
        <>
          <p>Bodyweight {bodyweight} kg</p>
          <AddUnit handleSubmit={addUnit} />
          <br />
        </>
      )}
    </>
  );
};

export default Form;
