import { saveKeyToLocalStorage } from "../utils";

const WeightForm = ({
  weight,
  input,
  updateInput,
  updateParticipant,
  participant,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    updateParticipant({ ...participant, weight: input });
    saveKeyToLocalStorage("weight", input);
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
