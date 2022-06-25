import React from "react";
import { saveKeyToLocalStorage } from "../utils";

const SessionOption = ({ session, updateSession, toggleEditSession }) => {
  return (
    <button
      onClick={() => {
        saveKeyToLocalStorage("session", JSON.stringify(session));
        updateSession(session);
        toggleEditSession(false);
      }}
    >
      {session.date}
    </button>
  );
};

export default SessionOption;
