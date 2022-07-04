import "./App.css";
import "./AddUnit.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./App.css";

import keanu from "./assets/beinings.png";
import johusa from "./assets/gdog.png";
import lilb from "./assets/lilb.png";

import { colorPalette } from "./theme";

import AddUnit from "./components/AddUnit";
import ResetWeight from "./components/ResetWeight";
import WeightForm from "./components/WeightForm";
import DisplayUser from "./components/DisplayUser";

import {
  getKeyFromLocalStorage,
  updateUnitsToLatestTenHours,
  getPromille,
  getGrams,
  saveKeyToLocalStorage,
} from "./utils";
import DisplayUnits from "./components/DisplayUnits";
import Button from "./components/Button";

// localStorage.clear();

const App = () => {
  const [input, updateInput] = useState("");
  const [showUnitForm, toggleShowUnitForm] = useState(false);
  const [addUnit, toggleAddUnit] = useState(false);

  const [promille, setPromille] = useState(0);
  const [weight, setWeight] = useState(getKeyFromLocalStorage("weight"));
  const [units, setUnits] = useState(
    JSON.parse(getKeyFromLocalStorage("units") || "[]")
  );

  const name = "Brage";
  const image = keanu;

  const getTotalGram = (newUnits = []) => {
    const unitsToUse = newUnits.length > 0 ? newUnits : units;

    let gramAcc = 0;
    unitsToUse.forEach(
      (unit) => (gramAcc += getGrams(unit?.cl, unit?.percentage))
    );
    return gramAcc.toFixed(3);
  };

  const getSessionLengthInHours = (newUnit) => {
    const unitsToUse = newUnit ? [...units, newUnit] : units;

    const duration = unitsToUse[0]?.time?.time
      ? unitsToUse[0]?.time?.time
      : moment(new Date()).format("HH:mm");

    return moment().diff(moment(duration, "HH:mm"), "minutes") / 60;
  };

  const promilleCallback = (newUnit) => {
    const unitsList = newUnit ? [...units, newUnit] : units;
    const unitsToUse = updateUnitsToLatestTenHours(unitsList, moment);

    const currentPromille = getPromille(
      getTotalGram(unitsToUse),
      weight,
      getSessionLengthInHours(unitsToUse)
    );

    if (currentPromille <= 0) {
      setUnits([]);
      saveKeyToLocalStorage("units", JSON.stringify([]));
      return 0;
    }

    return currentPromille.toFixed(2);
  };

  const handleDeleteUnit = (unit) => {
    const { id } = unit;
    const newUnits = units.filter((unit) => unit.id !== id);
    setUnits(newUnits);
    setPromille(
      newUnits.length < 1
        ? 0
        : getPromille(
            getTotalGram(newUnits),
            weight,
            getSessionLengthInHours(newUnits)
          ).toFixed(2)
    );
    saveKeyToLocalStorage("units", JSON.stringify(newUnits));
  };

  useEffect(() => {
    setPromille(promilleCallback());
  }, []);

  const handleUnitUpdate = (newUnit) => {
    const newUnits = updateUnitsToLatestTenHours([...units, newUnit], moment);
    saveKeyToLocalStorage("units", JSON.stringify(newUnits));
    setPromille(promilleCallback(newUnit));

    setUnits(newUnits);
  };

  const gutta = [
    {
      id: 0,
      name: "Jonas",
      src: image,
      promille: 0.31,
      units: [],
    },
    {
      id: 1,
      name: "Ådne",
      src: johusa,
      promille: 0.33,
      units: [],
    },
    {
      id: 2,
      name: "Mathias",
      src: lilb,
      promille: 0.45,
      units: [],
    },
  ];

  const getBackgroundColor = () => {
    if (promille < 0.5) return "purple";
    if (promille > 0.5 && promille < 1) return "green";
    if (promille > 1) return "crimson";
  };

  return (
    <div className="App">
      {!weight && (
        <WeightForm
          weight={weight}
          input={input}
          updateInput={updateInput}
          setWeight={setWeight}
        />
      )}
      {!addUnit && weight && (
        <div>
          <aside>
            <section
              style={{ backgroundColor: getBackgroundColor() }}
              onClick={toggleAddUnit}
              className="promille"
            >
              <h1>{promille}</h1>
            </section>
            <section onClick={toggleAddUnit} className="add__unit">
              +
            </section>
          </aside>
          {units && (
            <div style={{ marginTop: 48 }}>
              <DisplayUnits
                units={units}
                deleteUnit={handleDeleteUnit}
                promille={promille}
              />
            </div>
          )}
          <section className="user__displays">
            {gutta.map((gutt) => (
              <DisplayUser gutt={gutt} />
            ))}
          </section>
        </div>
      )}
      {weight && addUnit && (
        <div>
          <Button
            color="black"
            borderColor={colorPalette.concrete}
            backgroundColor={colorPalette.concrete}
            onClick={() => toggleAddUnit(false)}
          >
            ← Gå tilbake
          </Button>
          {name}, {weight}kg
          {/* <img src={image} alt="keanu" /> */}
          <AddUnit
            showUnitForm={showUnitForm}
            toggleShowUnitForm={toggleShowUnitForm}
            handleUnitUpdate={handleUnitUpdate}
          />
          <br />
          <br />
          <DisplayUnits
            units={units}
            deleteUnit={handleDeleteUnit}
            promille={promille}
          />
          <Button
            onClick={() => {
              localStorage.removeItem("units");
              window.location.reload();
            }}
            color={colorPalette.white}
            borderColor={colorPalette.redOrange}
            backgroundColor={colorPalette.redOrange}
          >
            <h1>ADMIN</h1>
            <h2>Reset settings</h2>
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
