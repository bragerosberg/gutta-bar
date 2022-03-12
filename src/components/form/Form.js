import React, { useState } from "react";
import AddUnit from "./AddUnit";

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
