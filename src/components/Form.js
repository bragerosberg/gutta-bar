import React, { useState } from "react";

const Form = ({ toggleSetupComplete }) => {
  const [bw, setBw] = useState(0);
  const handleSubmit = () => {
    console.log(bw);
    localStorage.setItem("bw", JSON.stringify(bw));
    toggleSetupComplete(true);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setBw(value);
    console.log(target);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bw">Vekt</label>
        <input
          id="bw"
          name="bw"
          type="number"
          value={bw}
          onChange={handleChange}
        />
      </form>
      <button onClick={handleSubmit}>Legg til vekt</button>
    </>
  );
};

export default Form;
