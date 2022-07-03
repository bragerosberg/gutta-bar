import { resetKeyFromLocalStorage } from "../utils";
import Button from "./Button";
import { colorPalette } from "../theme";

const ResetWeight = () => {
  return (
    <Button
      onClick={() => resetKeyFromLocalStorage("weight")}
      color={colorPalette.white}
      borderColor={colorPalette.redOrange}
      backgroundColor={colorPalette.redOrange}
    >
      Reset Weight
    </Button>
  );
};

export default ResetWeight;
