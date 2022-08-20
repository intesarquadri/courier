const { isValid, isValidCoupon } = require("./util");

exports.choices = [
  { title: "Estimate delivery cost", value: "cost" },
  { title: "Estimate delivery time", value: "time" },
  { title: "Exit", value: "exit" },
];

exports.details = [
  {
    type: "number",
    name: "baseCost",
    message: "Enter Base Delivery Cost",
    validate: isValid,
    
  },
  {
    type: "number",
    name: "numberOfPackage",
    message: "Enter Total Number Of Packages",
    validate: isValid,
  },
];

exports.questions = [
  {
    type: "number",
    name: "packageId",
    message: "Enter Package Id",
  },
  {
    type: "number",
    name: "weight",
    message: "Enter Weight",
    validate: isValid,
  },
  {
    type: "number",
    name: "distance",
    message: "Enter the Distance",
    validate: isValid,
  },
  {
    type: "text",
    name: "coupon",
    message: "Apply Coupon",
  },
];

exports.coupons = [
  {
    id: 1,
    code: "OFR001",
    discountPercent: 10,
    minDistance: 0,
    maxDistance: 200,
    minWeight: 70,
    maxWeight: 200,
  },
  {
    id: 2,
    code: "OFR002",
    discountPercent: 7,
    minDistance: 50,
    maxDistance: 150,
    minWeight: 100,
    maxWeight: 250,
  },
  {
    id: 3,
    code: "OFR003",
    discountPercent: 5,
    minDistance: 50,
    maxDistance: 250,
    minWeight: 10,
    maxWeight: 150,
  },
];

exports.vehiclesDetails = [
  {
    type: "number",
    name: "numberOfVehicles",
    message: "Enter Number Of Vehicles",
  },
  {
    type: "number",
    name: "maxCarriableWeight",
    message: "Enter Carriable Weight",
  },
  {
    type: "number",
    name: "maxSpeed",
    message: "Enter Max Speed",
  },
];
