import "./App.css";
import "./AddUnit.css";
import React, { useState, useEffect } from "react";
import moment from "moment";

import AddUnit from "./components/AddUnit";
import ResetWeight from "./components/ResetWeight";
import WeightForm from "./components/WeightForm";

import {
  saveKeyToLocalStorage,
  getKeyFromLocalStorage,
  updateUnitsToLatestTenHours,
  getPromille,
  getGrams,
} from "./utils";
import DisplayUnits from "./components/DisplayUnits";
import SessionOption from "./components/SessionOption";

/**
 *
 * On landing page, after entering body weight, a session shall be selected
 * Render sessions that are on DD-MM-YYYY or DD-MM-YYYY -1 DD
 * Admin can create sessions
 */

// localStorage.clear();

const App = () => {
  const [input, updateInput] = useState();
  const [showUnitForm, toggleShowUnitForm] = useState(false);

  const [editSession, toggleEditSession] = useState(false);

  // const [promille, updatePromille] = useState(0);
  // const [weight, setWeight] = useState(getKeyFromLocalStorage("weight"));
  // const [units, updateUnits] = useState(
  //   JSON.parse(getKeyFromLocalStorage("units") || "[]")
  // );
  const userId = "Brage";

  const [participant, updateParticipant] = useState({
    name: userId,
    img: "https://media-exp1.licdn.com/dms/image/C4D03AQEkekboMDFH-A/profile-displayphoto-shrink_200_200/0/1647851404608?e=1659571200&v=beta&t=wWdnu8p9ZmRQT8PhgLGToclqvMfz4BmSzoSxVt6uh1g",
    units: JSON.parse(getKeyFromLocalStorage("units") || "[]"),
    promille: 0,
    weight: getKeyFromLocalStorage("weight"),
  });

  const [sessions, updateSessions] = useState(
    JSON.parse(getKeyFromLocalStorage("sessions") || "[]")
  );
  const [selectedSession, updatedSelectedSession] = useState();

  const dateToday = moment(new Date()).format("DD-MM-yyyy");

  const getTotalGram = () => {
    let gramAcc = 0;
    participant?.units.forEach(
      (unit) => (gramAcc += getGrams(unit?.cl, unit?.percentage))
    );
    return gramAcc.toFixed(3);
  };

  const getSessionLengthInHours = () => {
    return (
      moment().diff(
        moment(participant?.units[0]?.time?.time, "HH:mm"),
        "minutes"
      ) / 60
    );
  };

  useEffect(() => {
    // Attempt fetching session
    const sessionFromLocalStorage = JSON.parse(
      getKeyFromLocalStorage("session") || "{}"
    );
    const sessionAlreadyToday =
      sessionFromLocalStorage?.date?.substring(0, 10) === dateToday;
    if (sessionAlreadyToday) updatedSelectedSession(sessionFromLocalStorage);

    // Update units to be last 10 hours
    updateParticipant({
      ...participant,
      units: updateUnitsToLatestTenHours(participant?.units, moment),
    });

    // Calculate promille
    const totalGrams = getTotalGram();
    const sesstionDurationInhours = getSessionLengthInHours();
    updateParticipant({
      ...participant,
      promille: getPromille(
        totalGrams,
        participant?.weight,
        sesstionDurationInhours
      ),
    });
  }, []);

  const handleUnitUpdate = (newUnit) => {
    const newUnits = updateUnitsToLatestTenHours(
      [...participant?.units, newUnit],
      moment
    );
    saveKeyToLocalStorage("units", JSON.stringify(newUnits));
    updateParticipant({ ...participant, units: newUnits });
  };

  const handleSessionCreate = () => {
    const firstSessionOfDay = sessions.map((session) => {
      return session?.date.includes(selectedSession);
    }).length;

    if (firstSessionOfDay.length === 0) {
      const newSession = { date: dateToday, participants: [] };
      updateSessions([...sessions, newSession]);
      updatedSelectedSession(newSession);
      saveKeyToLocalStorage("session", JSON.stringify(newSession));
      saveKeyToLocalStorage(
        "sessions",
        JSON.stringify([...sessions, newSession])
      );
      toggleEditSession(false);
      return;
    }
    const newSession = {
      date: `${dateToday}-${firstSessionOfDay}`,
      participants: [],
    };
    saveKeyToLocalStorage("session", JSON.stringify(newSession));
    saveKeyToLocalStorage(
      "sessions",
      JSON.stringify([...sessions, newSession])
    );
    updatedSelectedSession(newSession);
    toggleEditSession(false);
  };

  return (
    <div className="App">
      {!participant?.weight && (
        <WeightForm
          weight={participant?.weight}
          input={input}
          updateInput={updateInput}
          updateParticipant={updateParticipant}
          participant={participant}
        />
      )}
      {participant?.weight && (!selectedSession || editSession) && (
        <div>
          <p>Session not selected</p>
          <p>Join a session or ask admin to create one</p>
          {sessions.map((session) => {
            return (
              <SessionOption
                key={session.date}
                session={session}
                updateSession={updatedSelectedSession}
                toggleEditSession={toggleEditSession}
              />
            );
          })}
          <br />
          <br />
          <button onClick={handleSessionCreate}>
            Create new for {dateToday}
          </button>
        </div>
      )}
      {participant?.weight && selectedSession && !editSession && (
        <div>
          <h1>{selectedSession?.date}</h1>
          {!editSession && (
            <button onClick={() => toggleEditSession(true)}>
              Go to session overview
            </button>
          )}
          {participant?.weight}kg
          <AddUnit
            showUnitForm={showUnitForm}
            toggleShowUnitForm={toggleShowUnitForm}
            handleUnitUpdate={handleUnitUpdate}
          />
          <ResetWeight />
          <br />
          <button
            onClick={() => {
              localStorage.removeItem("units");
              window.location.reload();
            }}
          >
            Clear units localstorage
          </button>
          <br />
          <br />
          <DisplayUnits units={participant?.units} />
          <h1>Promille {participant?.promille}</h1>
        </div>
      )}
    </div>
  );
};

export default App;
