const UnitDrink = ({
  illustration,
  activeUnit,
  name,
  setActiveUnit,
  setDefaultValuesOnUnit,
}) => {
  const getDefaultValuesFromUnit = (name) => {
    if (name === "pils")
      return {
        cl: 50,
        percentage: 4,
      };
    if (name === "vin")
      return {
        cl: 20,
        percentage: 7,
      };
    if (name === "shot")
      return {
        cl: 4,
        percentage: 15,
      };
    if (name === "custom")
      return {
        cl: 1,
        percentage: 1,
      };
  };
  return (
    <div
      className={activeUnit === name ? "selected" : "not_selected"}
      onClick={() => {
        setActiveUnit(name);
        setDefaultValuesOnUnit(getDefaultValuesFromUnit(name));
      }}
    >
      <img className="illustrationImage" src={illustration} alt="img" />
    </div>
  );
};

export default UnitDrink;
