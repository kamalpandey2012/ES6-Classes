import {Drone} from "../classes/drone";
import {Car} from "../classes/car";
import {DataError} from "./data-error";

/*eslint-disable no-console*/
export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  findVehicleByLicense(licenseNumber) {
    let vehicles = this
      .cars
      .concat(this.drones);
    return vehicles.find(function (vehicle) {
      return vehicle.license == licenseNumber;
    });
  }

  getVehiclesSortedByLicense() {
    let vehicles = this
      .cars
      .concat(this.drones);
    return vehicles.sort(function (vehicleA, vehicleB) {
      let vehicleALicense = vehicleA
        .license
        .toUpperCase();
      let vehicleBLicense = vehicleB
        .license
        .toUpperCase();

      if (vehicleALicense < vehicleBLicense) {
        return -1;
      }

      if (vehicleALicense > vehicleBLicense) {
        return 1;
      }

      return 0;
    });
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "drone":
          let drone = this.loadVehicleData(data);
          if (drone) {
            this
              .drones
              .push(drone);
          }
          break;
        case "car":
          let car = this.loadVehicleData(data);
          if (car) {
            this
              .cars
              .push(car);
          }
          break;
        default:
          let e = new DataError("Incorrect vehicle type to load ", data);
          this
            .errors
            .push(e);
          break;
      }
    }
  }

  filterVehiclesByModel(query) {
    let vehicles = this
      .cars
      .concat(this.drones);
    return vehicles.filter((el) => el.model.toLowerCase().indexOf(query.toLowerCase()) > -1);
  }

  loadVehicleData(data) {
    let validData = this.validData(data);
    if (!validData)
      return null;
    try {
      switch (data.type) {
        case "drone":
          let d = new Drone(data.license, data.model, data.latLong);
          d.airTimeHours = data.airTimeHours;
          d.base = data.base;
          return d;
          break;
        case "car":
          let c = new Car(data.license, data.model, data.latLong);
          c.make = data.make;
          c.miles = data.miles;
          return c;
          break;
      }
    } catch (e) {
      this
        .errors
        .push(new DataError("Some error occured ", data));
    }
    return null;
  }

  validData(data) {
    let commonRequiredFields = "license model latLong".split(" ");
    let requiredFields = null;
    let hasError = false;

    if (data.type == "drone")
      requiredFields = "base airTimeHours".split(" ");
    if (data.type == "car")
      requiredFields = "miles make".split(" ");

    requiredFields = requiredFields.concat(commonRequiredFields);

    console.log(requiredFields);

    for (let field of requiredFields) {
      if (!data[field]) {
        this
          .errors
          .push(new DataError(`invalid field ${field}`, data));
        hasError = true;
      }
    }
    return !hasError;
  }
}
