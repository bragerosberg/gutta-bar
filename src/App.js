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
import settings from "./assets/settings.png";
import isBefore from "date-fns/isBefore";
import toDate from "date-fns/toDate";

const App = () => {
  const [grams, setGrams] = useState(
    Number(JSON.parse(localStorage.getItem("grams")))
  );
  const [bac, setBac] = useState(Number(localStorage.getItem("bac")));
  const [sessionStarted, setSessionStarted] = useState(
    bac > 0 ? Date.parse(localStorage.getItem("sessionStarted")) : false
  );
  const [hoursDuration, setHoursDuration] = useState(0);
  const [bodyweight, saveBodyweight] = useState(
    Number(JSON.parse(localStorage.getItem("bw")))
  );
  const [units, setUnits] = useState([]);
  const [config, setConfig] = useState();

  const [showSettings, toggleShowSettings] = useState(false);

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
      }, 10000);

      if (bac <= 0) clearInterval(session);

      return () => clearInterval(session);
    }
  }, [sessionStarted, bac, bodyweight, grams]);

  const addUnit = (entry) => {
    if (!sessionStarted) {
      const sessionStartTime = new Date();
      setSessionStarted(sessionStartTime);
      localStorage.sessionStarted = sessionStartTime;
    }

    setConfig({
      units: [...units, entry],
    });

    localStorage.setItem("config", config);

    const newUnits = [...units, entry];
    setUnits(newUnits);
    localStorage.units = JSON.stringify(newUnits);

    const { milliLiter, alchP } = entry;
    const newGrams = getGrams(parseInt(milliLiter), parseInt(alchP));

    console.log(entry.time, toDate(sessionStarted));
    console.log(isBefore(entry.time, toDate(sessionStarted)));

    if (isBefore(entry.time, toDate(sessionStarted))) {
      // Entry is before session start

      /*
      1 Tell gram på entry
      2 Remove gram på entry basert på tiden fra  entry.time og sessionstarted
      3 Append gram og bac dersom det er noe tilgjengelig som ikke er brent
       */
      console.log("inside");
      // const newHoursDuration =
      //   differenceInSeconds(entry.time, new Date()) / 3600;
      // console.log(newHoursDuration, "nwh");
      // const gramsBurned =
      //   newGrams / (bodyweight * BODY_DISTRIBUTION_PERCENTAGE) -
      //   HOURLY_BURN_RATE * newHoursDuration;

      // setHoursDuration(newHoursDuration);
    } else {
      setGrams(newGrams);

      localStorage.setItem("grams", newGrams);
      updateBac(milliLiter, alchP);
    }
  };

  const handleRemoveUnit = (entry) => {
    const { id, milliLiter, alchP } = entry;
    const newUnits = units.filter((unit) => unit.id !== id);
    setUnits(newUnits);
    localStorage.units = JSON.stringify(newUnits);

    const gramsToRemove = parseInt(milliLiter) * (parseInt(alchP) / 100) * 0.8;
    const newGrams = grams - gramsToRemove;
    setGrams(newGrams);

    const newBac =
      newGrams / (bodyweight * BODY_DISTRIBUTION_PERCENTAGE) -
      HOURLY_BURN_RATE * hoursDuration;

    if (units.length <= 1) {
      setBac(0);
    } else {
      setBac(Math.abs(newBac));
    }
    localStorage.setItem("bac", newBac);
  };

  const clearSession = () => {
    setBac(0);
    setGrams(0);
    setUnits([]);
    localStorage.removeItem("grams");
    localStorage.removeItem("bac");
    localStorage.removeItem("units");
  };

  const resetDetails = () => {
    clearSession();
    localStorage.removeItem("bw");
  };

  return (
    <div className="App">
      <Intro />
      {sessionStarted && <BAC bac={bac} />}
      <Form addUnit={addUnit} saveBodyweight={saveBodyweight} />
      <DisplayUnits units={units} removeUnit={handleRemoveUnit} />
      <img
        onClick={() => toggleShowSettings(!showSettings)}
        className="settings"
        src={settings}
        alt="settings"
      />
      {sessionStarted && (
        <>
          {showSettings && (
            <ResetConfigButton
              resetDetails={resetDetails}
              clearSession={clearSession}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
