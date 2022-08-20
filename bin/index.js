const loader = require("./loaders/options");
const { getPrice } = require("./controllers/getPrice");
const { getTime } = require("./controllers/getTime");

loader.greet();
const App = async () => {
  const { selectedOption } = await loader.getOptions();
  switch (selectedOption) {
    case "cost":
      await getPrice();
      break;
    case "time":
      await getTime();
      break;
    case "exit":
      process.exit(0);
    default:
      break;
  }
};

App();
