//this file will generate sample data from yesterday back to (default) 25 days with some empty days between
const fetchService = require("../components/API/fetchService.js");

const MAX_TIME_RANGE = 25; //days backwards
const CHANGE_OF_EMPTY_DAYS = 0.15;

const checkIfDayWillBeNotEmpty = () => {
  if (CHANGE_OF_EMPTY_DAYS === 0) return false;

  let randomValue = Math.floor(Math.random() * CHANGE_OF_EMPTY_DAYS * 100) + 1;
  if (randomValue < CHANGE_OF_EMPTY_DAYS * 100) return true;
  else return false;
};

const generateWeight = (max, min) => {
  return Math.floor(Math.random() * (max * 10 - min * 10 + 1) + min * 10) / 10;
};

const generateData = async (measure = "kg", min = 70, max = 74) => {
  let max_weight, min_weight;
  if (measure === "kg") {
    min_weight = 70;
    max_weight = 74;
  } else {
    //lb
    min_weight = 150;
    max_weight = 160;
  }

  var res = [];
  for (let i = 1; i <= MAX_TIME_RANGE; i++) {
    var hasNoError = true;

    if (checkIfDayWillBeNotEmpty()) {
      let day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - i);
      let weight = generateWeight(max_weight, min_weight);

      res.push({
        identifier: "weight",
        value: weight,
        date: day,
        measure: measure
      });
    }
  }

  console.log("res", res);

  await fetchService.default.postManyData(res).catch(err => {
    console.log(err);
    hasNoError = false;
  });

  return hasNoError;
};

export default generateData;
