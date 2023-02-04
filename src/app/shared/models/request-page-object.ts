import { DriveDTO } from "./drive-dto";
import { DriverDataDTO } from "./driver-data-dto";
import { DriverDTO } from "./driver-dto";
import { PassengerDTO } from "./passenger-dto";

export interface RequestPageObject {
    totalItems: number,
    drives: DriveDTO[],
    drivers: DriverDTO[],
    passengers: PassengerDTO[],
    driverData: DriverDataDTO[],
    totalPages: number
}