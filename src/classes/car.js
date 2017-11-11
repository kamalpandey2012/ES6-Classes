import { Vehicle } from "./vehicle";

/*eslint-disable no-console*/

// car -  make, miles; vehicle- licence, type, model, latLong; drone: airTimeHours, base;
export class Car extends Vehicle {
  constructor(licence, model, latLong) {
    super(licence, model, latLong);
    this.make = null;
    this.miles = null;
  }
}
