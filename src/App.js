import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/form/Form";
import differenceInSeconds from "date-fns/differenceInSeconds";
import BAC from "./components/bac/BAC";
import DisplayUnits from "./components/unit/DisplayUnits";
import {
  BODY_DISTRIBUTION_PERCENTAGE,
  HOURLY_BURN_RATE,
} from "./config/config";
import Intro from "./components/intro/Intro";
import ResetConfigButton from "./components/settings/ResetConfigButton";

const App = () => {
  const [grams, setGrams] = useState(
    Number(JSON.parse(localStorage.getItem("grams")))
  );
  const [bac, setBac] = useState(Number(localStorage.getItem("bac")));
  const [sessionStarted, setSessionStarted] = useState(bac > 0);
  const [hoursDuration, setHoursDuration] = useState(0);
  const [bodyweight, saveBodyweight] = useState(
    Number(JSON.parse(localStorage.getItem("bw")))
  );
  const [units, setUnits] = useState([]);

  const getGrams = (milliLiter, alchP) => {
    return grams + milliLiter * (alchP / 100) * 0.8;
  };

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
      if (units && units.length < 1) {
        setUnits(JSON.parse(localStorage.getItem("units")));
      }
      const session = setInterval(() => {
        const newHoursDuration =
          differenceInSeconds(new Date(), sessionStarted) / 3600;
        setHoursDuration(newHoursDuration);

        const newBac =
          grams / (bodyweight * BODY_DISTRIBUTION_PERCENTAGE) -
          HOURLY_BURN_RATE * newHoursDuration;

        localStorage.setItem("bac", newBac);

        setBac(newBac);
      }, 300000);

      if (bac <= 0) clearInterval(session);

      return () => clearInterval(session);
    }
  }, [sessionStarted, bac, bodyweight, grams]);

  const addUnit = (entry) => {
    if (!sessionStarted) {
      setSessionStarted(new Date());
    }
    const newUnits = [...units, entry];
    setUnits(newUnits);
    localStorage.units = JSON.stringify(newUnits);

    const { milliLiter, alchP } = entry;

    const newGrams = getGrams(milliLiter, alchP);
    setGrams(newGrams);

    localStorage.setItem("grams", newGrams);
    updateBac(milliLiter, alchP);
  };

  const resetDetails = () => {
    setBac(0);
    setGrams(0);
    setUnits([]);
    localStorage.removeItem("grams");
    localStorage.removeItem("bac");
    localStorage.removeItem("units");
  };

  return (
    <div className="App">
      <Intro />
      <BAC bac={bac} />
      <Form addUnit={addUnit} saveBodyweight={saveBodyweight} />
      <DisplayUnits units={units} />
      <ResetConfigButton resetDetails={resetDetails} />
    </div>
  );
};

export default App;
