import { Drone } from "./classes/drone";
import { Car } from "./classes/car";
import { fleet } from "./fleet";
import { FleetDataService } from "./services/fleet-data-service";
/*eslint-disable no-console*/
let fleetDataService = new FleetDataService();

fleetDataService.loadData(fleet);

let errors = fleetDataService.errors;

for (let error of errors) {
  console.log(error);
}

let c = new Car();
let d = new Drone();
