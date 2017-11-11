import { Drone } from "../classes/drone";
import { Car } from "../classes/car";
import { DataError } from "./data-error";

/*eslint-disable no-console*/
export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "drone":
          let drone = this.loadVehicleData(data);
          this.drones.push(drone);
          break;
        case "car":
          let car = this.loadVehicleData(data);
          this.cars.push(car);
          break;
        default:
          let e = new DataError("Incorrect vehicle type to load ", data);
          this.errors.push(e);
          break;
      }
    }
  }

  loadVehicleData(data) {
    try {
      switch (data.type) {
        case "drone":
          let d = new Drone(data.licence, data.model, data.latLong);
          d.airTimeHours = data.airTimeHours;
          d.base = data.base;
          return d;
          break;
        case "car":
          let c = new Car(data.licence, data.model, data.latLong);
          c.make = data.make;
          c.miles = data.miles;
          return c;
          break;
      }
    } catch (e) {
      this.errors.push(new DataError("Some error occured ", data));
      return null;
    }
  }
}
