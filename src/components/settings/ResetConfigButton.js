import React from "react";

const ResetConfigButton = ({ resetDetails }) => {
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem("bw");
          window.location.reload();
        }}
      >
        Remove config
      </button>
      <button onClick={() => resetDetails()}>Reset BAC</button>
    </>
  );
};

export default ResetConfigButton;
