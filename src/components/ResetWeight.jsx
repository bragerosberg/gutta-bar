import { resetKeyFromLocalStorage } from "../utils";

const ResetWeight = () => {
  return (
    <button
      style={{ position: "fixed", bottom: 0, padding: 20 }}
      onClick={() => resetKeyFromLocalStorage("weight")}
    >
      Reset weight
    </button>
  );
};

export default ResetWeight;
