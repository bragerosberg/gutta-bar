import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// TODO
/* 
  - [X] Add option to clear bac
  - [X] Make bac decrease over time
  - [] Localstorage of choices
  - [X] Add list of bac entries
    - [] Add time of when it was added
  - [] History feature
    - See previous events, starttime & endtime
*/

const ResetConfigButton = () => {
  return (
    <button
      onClick={() => {
        localStorage.removeItem("bw");
        window.location.reload();
      }}
    >
      Remove config
    </button>
  );
};

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
          <ResetConfigButton />
        </>
      )}
    </>
  );
};

export default Form;
