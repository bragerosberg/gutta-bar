import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Form from "./components/Form";
import differenceInSeconds from "date-fns/differenceInSeconds";

const BODY_DISTRIBUTION_PERCENTAGE = 0.65;
const HOURLY_BURN_RATE = 0.15;

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
  const [sessionStarted, setSessionStarted] = useState(bac > 0);
  const [hoursDuration, setHoursDuration] = useState(0);
  const [bodyweight, saveBodyweight] = useState(
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
    const newBac = calculateAbv(milliLiter, alchP, bodyweight).toFixed(3);
    setBac(calculateAbv(milliLiter, alchP, bodyweight));
    localStorage.setItem("bac", newBac);
  };

  const calculateAbv = (milliLiter, alchP, bw) => {
    return (
      getGrams(milliLiter, alchP) / (bw * BODY_DISTRIBUTION_PERCENTAGE) -
      HOURLY_BURN_RATE * hoursDuration
    );
  };

  useEffect(() => {
    if (bac > 0) {
      const session = setInterval(() => {
        const newHoursDuration =
          differenceInSeconds(new Date(), sessionStarted) / 3600;
        setHoursDuration(newHoursDuration);
        setBac(
          grams / (bodyweight * BODY_DISTRIBUTION_PERCENTAGE) -
            HOURLY_BURN_RATE * newHoursDuration
        );
      }, 300000);

      return () => clearInterval(session); //This is important
    }
  }, [sessionStarted]);

  const addUnit = (entry) => {
    if (!sessionStarted) {
      setSessionStarted(new Date());
    }
    const { milliLiter, alchP } = entry;
    setGrams(getGrams(milliLiter, alchP));
    updateBac(milliLiter, alchP);
  };

  const resetDetails = () => {
    setBac(0);
    setGrams(0);
  };

  return (
    <div className="App">
      <Intro />
      <p>Promille {bac.toFixed(2)}</p>
      <Form addUnit={addUnit} saveBodyweight={saveBodyweight} />
      <br />
      <button onClick={() => resetDetails()}>Reset BAC</button>
    </div>
  );
};

export default App;
