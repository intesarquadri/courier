const chalk = require("chalk");
const boxen = require("boxen");
const prompts = require("prompts");
const { details, vehiclesDetails, choices } = require("./constants");

module.exports = {
  //for initial greeting message
  greet: () => {
    const greeting = chalk.white.bold("Welcome to Kiki Courier services");

    const boxenOptions = {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
      backgroundColor: "#767676",
    };
    const greetings = boxen(greeting, boxenOptions);

    console.log(greetings);
  },
  //for showing options
  getOptions: async () => {
    const response = await prompts({
      type: "select",
      name: "selectedOption",
      message: "Choose a service",
      choices: choices,

      initial: 0,
    });
    return response;
  },

  //for cost estimation
  getCostOptions: async () => {
    const response = await prompts(details);
    return response;
  },

  //for time estimation
  getTimeOptions: async () => {
    const response = await prompts({
      type: "select",
      name: "selectedOption",
      message: "Choose a service",
      choices: choices,

      initial: 0,
    });
    return response;
  },

  getVehileOptions: async () => {
    const response = await prompts(vehiclesDetails);
    return response;

  },

  isValid(baseCost) {
    if (Number(baseCost) >= 0 && baseCost != null) {
      return true;
    } else {
      return console.log("Please Enter a Valid Number");
    }
  },
};
