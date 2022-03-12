import React from "react";

const ResetConfigButton = ({ resetDetails, clearSession }) => {
  return (
    <>
      <button
        onClick={() => {
          resetDetails();
          window.location.reload();
        }}
      >
        Remove config
      </button>
      <button
        onClick={() => {
          clearSession();
        }}
      >
        Reset session
      </button>
    </>
  );
};

export default ResetConfigButton;
