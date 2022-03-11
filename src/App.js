import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Form from "./components/Form";
import * as datefns from "date-fns";

const BODY_DISTRIBUTION_PERCENTAGE = 0.65;
const HOURLY_BURN_RATE = 0.15;
const durationInHours = 0.01;

const Intro = () => {
  return (
    <section>
      <p>Gutta Bar</p>
      <img className="App-logo" src={logo} alt="gutta" />
    </section>
  );
};

const App = () => {
  const [grams, setGrams] = useState(0);
  const [bac, setBac] = useState(localStorage.getItem("bac") | "0%");
  const [bodyweight, setBodyweight] = useState(
    Number(JSON.parse(localStorage.getItem("bw")))
  );

  const getGrams = (milliLiter, alchP) => {
    return grams + milliLiter * (alchP / 100) * 0.8;
  };
  /*
    Alkohol i gram (dl * Vol% * 0,8)/ (kroppsvekten i kg * X %) – (Y * timer fra drikkestart) = promille

    X/bdp = woman ? 55% : 65%
    Y/hbr = 0.15
  */

  const updateBac = (milliLiter, alchP) => {
    const newBac = calculateAbv(milliLiter, alchP, bodyweight);
    console.log(milliLiter, alchP, bodyweight, "newbac");
    setBac(calculateAbv(milliLiter, alchP, bodyweight));
    localStorage.setItem("bac", newBac);
  };

  const calculateAbv = (milliLiter, alchP, bw) => {
    return (
      getGrams(milliLiter, alchP) / (bw * BODY_DISTRIBUTION_PERCENTAGE) -
      HOURLY_BURN_RATE * durationInHours
    );
  };

  const addUnit = (entry) => {
    const { milliLiter, alchP } = entry;
    setGrams(getGrams(milliLiter, alchP));
    updateBac(milliLiter, alchP);
  };

  console.log("grams", grams);
  console.log("bac", bac);

  return (
    <div className="App">
      <Intro />
      <p>{bac}</p>
      <Form addUnit={addUnit} />
    </div>
  );
};

export default App;
