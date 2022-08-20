const prompts = require("prompts");

let finalProductArray = [];
const checkValues = (values, i, package) => {
  const { coupon: appliedCoupon, numberOfPackage } = values;
  package = { ...values };
  const coupon = checkCoupon(values);

  return calculateCost(values, i, package, coupon);
};

const checkCoupon = (value) => {
  const { coupons } = require("./constants");

  const { weight, distance } = value;

  const coupon = coupons.find(
    (coupon) => coupon.code === value.coupon.toUpperCase()
  );

  if (!coupon) {
    return false;
  } else {
    const { minWeight, maxWeight, minDistance, maxDistance } = coupons.find(
      (coupon) => coupon.code === value.coupon.toUpperCase()
    );

    if (
      coupon &&
      parseFloat(weight) >= parseFloat(minWeight) &&
      parseFloat(weight) <= parseFloat(maxWeight) &&
      parseFloat(distance) >= parseFloat(minDistance) &&
      parseFloat(distance) <= parseFloat(maxDistance)
    ) {
      return coupon; //if coupon satisfies the discount criteria
    }
    return false; // if coupon doesnt satisfies the discount criteria
  }
};

//Calculate total cost estimation

const calculateCost = (values, i, package, coupon) => {
  const { baseCost, weight, distance, numberOfPackage } = values;
  package.discount = 0;

  const deliveryCost =
    parseFloat(baseCost) + parseFloat(weight) * 10 + parseFloat(distance) * 5;
  package[`totalCost`] = deliveryCost;

  if (coupon) {
    const { discountPercent } = coupon;
    const totalDiscount =
      (parseFloat(discountPercent.toFixed(2)) / 100) * parseFloat(deliveryCost);
    package.discount = totalDiscount;
    let totalCost = 0;

    if (parseFloat(deliveryCost) > parseFloat(totalDiscount)) {
      totalCost = parseFloat(deliveryCost) - parseFloat(totalDiscount);
    }
    package[`totalCost`] = totalCost;
  }

  finalProductArray.push({ ...package });
  if (parseInt(i) === parseInt(numberOfPackage) - 1) {
    return finalProductArray;
  }
  return;
};

exports.printPackageOutput = (package) => {
  return finalProductArray.map((package, key) => {
    console.log(
      "PKG" + (key + 1),
      package.packageId,
      +"    \t" + package.discount,
      +"  \t " + package.totalCost,
      +"   \t" + package.estimation_delivery_time
        ? package.estimation_delivery_time.toFixed(2)
        : ""
    );
  });
};

exports.isValid = (base) => {
  if (base > 0) return true;
  else return false;
};

exports.getCalculated = async (baseCost, numberOfPackage, questions) => {
  let package = {};
  let finalPackage;

  for (let i = 0; i < numberOfPackage; i++) {
    console.log("Enter details of package", i + 1);

    questions.map((q) => (q.baseCost = baseCost));

    await prompts(questions).then(async (res) => {
      res.baseCost = baseCost;
      res.numberOfPackage = numberOfPackage;
      finalPackage = await checkValues(res, i, package);
    });
  }

  return finalPackage;
};
