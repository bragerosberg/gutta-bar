import React, { useState } from "react";
import "./App.css";

const BODY_DISTRIBUTION_PERCENTAGE = 0.65;
const HOURLY_BURN_RATE = 0.15;

const App = () => {
  const [abv, setAbv] = useState(0);
  const [durationInHours, setDurationInHours] = useState(0);

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

  console.log(calculateAbv(10, 5, 5));

  return (
    <div className="App">
      <p>Gutta Bar</p>
    </div>
  );
};

export default App;
