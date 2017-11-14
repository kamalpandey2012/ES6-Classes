import { Vehicle } from "./vehicle";
/*eslint-disable no-console*/

export class Drone extends Vehicle {
  constructor(license, model, latLong) {
    super(license, model, latLong);
    this.airTimeHours = null;
    this.base = null;
  }
}
