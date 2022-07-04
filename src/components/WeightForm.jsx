import { saveKeyToLocalStorage } from "../utils";
import { colorPalette } from "../theme";
import Button from "./Button";

const WeightForm = ({ weight, input, updateInput, setWeight }) => {
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    saveKeyToLocalStorage("weight", input);
    setWeight(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h1>Vekten din</h1>
        <input
          style={{
            display: "flex",
            alignItems: "center",
            margin: "0 auto",
            padding: 20,
            fontSize: 25,
            marginBottom: 20,
          }}
          type="number"
          value={weight}
          onChange={(e) => updateInput(e.target.value)}
        />
      </label>
      <Button
        type="submit"
        onClick={() => {
          localStorage.removeItem("units");
          window.location.reload();
        }}
        color={colorPalette.white}
        borderColor={colorPalette.white}
        backgroundColor={colorPalette.royal}
      >
        Legg til +
      </Button>
    </form>
  );
};

export default WeightForm;
