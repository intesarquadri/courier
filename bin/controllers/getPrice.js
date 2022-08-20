const { questions } = require("../loaders/constants");
const loader = require("../loaders/options");
const { getCalculated, printPackageOutput } = require("../loaders/util");

module.exports = {
  getPrice: async () => {
    const { baseCost, numberOfPackage } = await loader.getCostOptions();
    let package = await getCalculated(baseCost, numberOfPackage, questions);
    printPackageOutput(package);
  },
};
