export const saveKeyToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getKeyFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const resetKeyFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const updateUnitsToLatestTenHours = (units = [], moment) => {
  const timeNow = moment(new Date(), "HH:mm");
  const timeTenHoursAgo = {
    time: moment().subtract(10, "hours"),
    day: moment().subtract(10, "hours") > timeNow ? "i går" : "i dag",
  };

  const filteredUnits = units.filter((unit) => {
    const { time } = unit.time;
    const unitTime = moment(time, "HH:mm");
    const unitDay = unitTime > timeNow ? "i går" : "i dag";

    return (
      unitTime.isSameOrAfter(timeTenHoursAgo.time) &&
      timeTenHoursAgo.day === unitDay
    );
  });
  return filteredUnits.sort((a, b) => {
    return moment(a.time.time, "HH:mm") - moment(b.time.time, "HH:mm");
  });
};

// I følge https://www.nettavisen.no/alkohol/julebord/jul/sa-mye-alkohol-far-du-i-deg/s/12-95-2774007 stemmer de ulike beregningene
// Dermed antar jeg mine kalkulasjoner som korrekte
export const getGrams = (centiliter, percentage) => {
  const desiliter = centiliter / 10;
  return desiliter * percentage * 0.8;
};

export const getPromille = (grams, weight, sessionLengthInHours) => {
  const promille = grams / (weight * 0.7) - 0.15 * sessionLengthInHours;
  if (promille > 0) return promille;
  return 0;
};
