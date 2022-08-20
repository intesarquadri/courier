
const calculateEstimationTime = (packages, vehicle) => {
  packages.forEach((package, key) => {
    package[`estimation_delivery_time`] =
      parseInt(package.distance) / parseInt(vehicle.maxSpeed);
      package["key"] = key + 1;

  });

  const sortPackageByWeight = packages.sort(comparePackageByWeight);
  const sortPackageByDistance = sortPackageByWeight.sort(
    comparePackageByDistance
  );

  // Check vehicle availablity
  const availableVehicles = checkVehicle(vehicle);
  return packagesVehicleAllocation(availableVehicles, sortPackageByDistance);
};

const checkVehicle = (vehicle) => {
  const availableVehicle = [];

  for (let i = 0; i < parseInt(vehicle.numberOfVehicles); i++) {
    const availableVehicleObj = {
      vehicleId: Math.floor(1000 + Math.random() * 9000),
      ...vehicle,
    };
    availableVehicle.push({ ...availableVehicleObj });
  }

  return availableVehicle;
};

const comparePackageByDistance = (a, b) => {
  if (a.distance < b.distance) {
    return -1;
  }
};

const comparePackageByWeight = (a, b) => {
  if (a.weight > b.weight) {
    return -1;
  }
};

//vehicle allocation
const packagesVehicleAllocation = (vehicles, packages) => {
  let vehicleAllocatedPackage = [];
  let vehicleAllocatedPackageObj = {};
  let index = 0;

  for (let i = 0; i < vehicles.length; i++) {
    let total = 0;

    for (let j = index; j < packages.length; j++) {
      if (
        parseInt(packages[j].weight) !==
        parseInt(vehicles[i].maxCarriableWeight)
      ) {
        total += parseInt(packages[j].weight);
        if (total <= parseInt(vehicles[i].maxCarriableWeight)) {
          vehicleAllocatedPackageObj = {
            ...packages[j],
            vehicleId: vehicles[i].vehicleId,
          };
          vehicleAllocatedPackage.push({ ...vehicleAllocatedPackageObj });
        } else {
          index = j;
          break;
        }
      } else {
        if (total === 0) {
          vehicleAllocatedPackageObj = {
            ...packages[j],
            vehicleId: vehicles[i].vehicleId,
          };
          vehicleAllocatedPackage.push({ ...vehicleAllocatedPackageObj });
        }

        index = j;
        break;
      }
    }
  }

  return vehicleAllocatedPackage;
};

module.exports = { calculateEstimationTime };
