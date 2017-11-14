import {Drone} from "./classes/drone";
import {Car} from "./classes/car";
import {fleet} from "./fleet";
import {FleetDataService} from "./services/fleet-data-service";
/*eslint-disable no-console*/
let fleetDataService = new FleetDataService();

fleetDataService.loadData(fleet);

let c = new Car();

// let data = fleetDataService.findVehicleByLicense("AT9900");
// console.log(data); let vehicles =
// fleetDataService.getVehiclesSortedByLicense(); let vehicles =
// fleetDataService.filterVehiclessByModel("t");
let vehicles = fleetDataService.filterVehiclesByModel("a");

for (let vehicle of vehicles) {
  console.log(vehicle.model);
}
