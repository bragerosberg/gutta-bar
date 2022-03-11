import React, { useState } from "react";

// TODO
/* 
  - [X] Add option to clear bac
  - [X] Make bac decrease over time
  - [] Add list of bac entries
    - [] Add time of when it was added
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
      <button onClick={() => handleSubmit({ milliLiter: 330, alchP: 4.7 })}>
        Add 330ml beer
      </button>
      <button onClick={() => handleSubmit({ milliLiter: 330, alchP: 4.7 })}>
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
