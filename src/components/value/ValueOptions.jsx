import React from "react";
import Value from "./Value";
import "./ValueOption.css";
import moment from "moment";

const getTimeArray = (lastDay, thisDay) => {
  return lastDay.concat([
    ...thisDay.slice(0, thisDay.length),
    { nickname: "Nå", time: moment(new Date()).format("HH:mm"), day: "i dag" },
  ]);
};

const makeObjectWithDay = (arrayToConvert, time, order) => {
  return arrayToConvert.map((timeslot) => {
    const day = timeslot < time && order === "before" ? "i dag" : "i går";
    return {
      time: timeslot,
      day,
    };
  });
};

const getLastDay = (items, timeIndex, hourNow) => {
  return makeObjectWithDay(
    items.slice(timeIndex + 1, items.length - 1),
    hourNow,
    "current"
  );
};

const getTimeIndex = (items, hourNow) => items.findIndex((e) => e === hourNow);

const getThisDay = (items, timeIndex, hourNow) => {
  return makeObjectWithDay(items.slice(0, timeIndex), hourNow, "before");
};

const ValueOptions = ({
  items,
  hourNow,
  onClick,
  currentValue,
  lastHour = false,
}) => {
  if (!hourNow) {
    return (
      <ul className="topContainer">
        {items.map((item) => (
          <div
            key={String(item)}
            className={item === currentValue ? "selected" : "notSelected"}
            onClick={() => onClick(item)}
          >
            <Value key={item} value={item} />
          </div>
        ))}
      </ul>
    );
  }
  const timeIndex = getTimeIndex(items, hourNow);
  const thisDay = getThisDay(items, timeIndex, hourNow);
  const lastDay = getLastDay(items, timeIndex, hourNow);
  const timeArray = lastHour
    ? getTimeArray(lastDay, thisDay).slice(-60).reverse()
    : getTimeArray(lastDay, thisDay).slice(-599).reverse();

  return (
    <ul className="topContainer">
      {timeArray.map(({ time, day, nickname = "" }) => (
        <div
          key={`${time}${day}`}
          onClick={() => onClick({ time, day })}
          className={
            (time === currentValue.time && currentValue.nickname === "Nå") ||
            (time === currentValue.time && !currentValue?.nickname)
              ? "selected"
              : "notSelected"
          }
        >
          <Value
            key={`${time}${day}`}
            value={nickname === "Nå" ? nickname : time}
          />
        </div>
      ))}
    </ul>
  );
};

export default ValueOptions;
