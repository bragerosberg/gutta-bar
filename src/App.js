import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Form from "./components/Form";
import * as datefns from "date-fns";

const BODY_DISTRIBUTION_PERCENTAGE = 0.65;
const HOURLY_BURN_RATE = 0.15;

const App = () => {
  const [abv, setAbv] = useState(0);
  const [config, setConfig] = useState({
    bw: localStorage.getItem("bw"),
  });
  const [startCounter, toggleStartCounter] = useState(false);
  const [setupComplete, toggleSetupComplete] = useState(Boolean(config.bw));
  const [startTime, setStartTime] = useState(undefined);
  const [durationInHours, setDurationInHours] = useState(undefined);

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

  useEffect(() => {
    setStartTime(new Date());
  }, [startCounter]);

  useEffect(() => {
    const timer = setInterval(
      () => setDurationInHours(durationInHours + 0.016),
      1000
    );

    return () => clearTimeout(timer);
  }, [startTime]);

  // save config in object

  /*
    Alkohol i gram (dl * Vol% * 0,8)/ (kroppsvekten i kg * X %) – (Y * timer fra drikkestart) = promille

    X/bdp = woman ? 55% : 65%
    Y/hbr = 0.15
  */

  const handleAdd = (desiliter) => {
    if (!startCounter) toggleStartCounter(true);
    setAbv(calculateAbv(desiliter, 0.45, config.bw));
  };

  const calculateAbv = (unitVolume, alchP, bw) => {
    return (
      (unitVolume * alchP * 0.8) / (bw * BODY_DISTRIBUTION_PERCENTAGE) -
      HOURLY_BURN_RATE * durationInHours
    );
  };

  return (
    <div className="App">
      <p>Gutta Bar</p>
      <img className="App-logo" src={logo} alt="gutta" />
      {setupComplete && (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => handleAdd(3)}>Legg til 0.3L</button>
            <button onClick={() => handleAdd(5)}>Legg til 0.5L</button>
          </div>
          <p>Config complete, kroppsvekt: {config.bw}</p>
          <p>time spent {durationInHours}</p>
          <p>Promille {abv}</p>
        </>
      )}
      {!setupComplete && <Form toggleSetupComplete={toggleSetupComplete} />}
    </div>
  );
};

export default App;
