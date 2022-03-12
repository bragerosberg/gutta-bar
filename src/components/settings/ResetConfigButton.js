import React from "react";

const ResetConfigButton = ({ resetDetails }) => {
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
    </>
  );
};

export default ResetConfigButton;
