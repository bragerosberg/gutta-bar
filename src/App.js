import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Form from "./components/Form";

const BODY_DISTRIBUTION_PERCENTAGE = 0.65;
const HOURLY_BURN_RATE = 0.15;

const App = () => {
  const [abv, setAbv] = useState(0);
  const [config, setConfig] = useState({
    bw: localStorage.getItem("bw"),
  });
  const [setupComplete, toggleSetupComplete] = useState(Boolean(config.bw));
  const [durationInHours, setDurationInHours] = useState(0); //moment js for config start time

  useEffect(() => {
    setConfig({
      ...config,
      bw: Number(JSON.parse(localStorage.getItem("bw"))),
    });
  }, []);

  useEffect(() => {
    setConfig({
      ...config,
      bw: Number(JSON.parse(localStorage.getItem("bw"))),
    });
  }, [setupComplete]);

  // save config in object

  /*
    Alkohol i gram (dl * Vol% * 0,8)/ (kroppsvekten i kg * X %) – (Y * timer fra drikkestart) = promille

    X/bdp = woman ? 55% : 65%
    Y/hbr = 0.15
  */

  const calculateAbv = (unitVolume, alchP, bw) => {
    return (
      (unitVolume * alchP * 0, 8) / (bw * BODY_DISTRIBUTION_PERCENTAGE) -
      HOURLY_BURN_RATE * durationInHours
    );
  };

  console.log(setupComplete, config);

  return (
    <div className="App">
      <p>Gutta Bar</p>
      <img className="App-logo" src={logo} alt="gutta" />
      {setupComplete && (
        <>
          <p>Legg til 0.3L</p>
          <p>Legg til 0.5L</p>
          <p>Config complete, kroppsvekt: {config.bw}</p>
        </>
      )}
      {!setupComplete && <Form toggleSetupComplete={toggleSetupComplete} />}
    </div>
  );
};

export default App;
