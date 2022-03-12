import React from "react";
import reset from "../../assets/reset.png";
import stop from "../../assets/stop.png";
import "./ResetConfigButton.css";

const ResetConfigButton = ({ resetDetails, clearSession }) => {
  return (
    <div style={{ position: "absolute", bottom: 0 }}>
      <img
        className="remove__button"
        src={stop}
        alt="stop"
        onClick={() => {
          resetDetails();
          window.location.reload();
        }}
      />
      <img
        className="reset__button"
        src={reset}
        alt="reset"
        onClick={() => {
          clearSession();
        }}
      />
    </div>
  );
};

export default ResetConfigButton;
