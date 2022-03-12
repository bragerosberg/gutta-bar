import React from "react";

const BAC = ({ bac }) => {
  return <>{bac > 0 && <p>Promille {bac.toFixed(2)}</p>}</>;
};

export default BAC;
