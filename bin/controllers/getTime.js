const { questions } = require("../loaders/constants");
const loader = require("../loaders/options");
const { getCalculated, printPackageOutput } = require("../loaders/util");
const { calculateEstimationTime } = require("../loaders/timeUtil");

module.exports = {
  getTime: async () => {
    const { baseCost, numberOfPackage } = await loader.getCostOptions();
    let package = await getCalculated(baseCost, numberOfPackage, questions);
    const resp = await loader.getVehileOptions();

    if (package && package.length) {
      package = calculateEstimationTime(package, resp);
      printPackageOutput(package);
    }
  },
};
