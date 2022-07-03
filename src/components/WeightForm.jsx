import { saveKeyToLocalStorage } from "../utils";

const WeightForm = ({ weight, input, updateInput, setWeight }) => {
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    saveKeyToLocalStorage("weight", input);
    setWeight(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Legg til vekt:
        <input
          type="number"
          value={weight}
          onChange={(e) => updateInput(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default WeightForm;
