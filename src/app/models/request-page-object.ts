import { DriveDTO } from "./drive-dto";
import { DriverDataDTO } from "./driver-data-dto";

export interface RequestPageObject {
    totalItems: number,
    drives: DriveDTO[],
    driverData: DriverDataDTO[],
    totalPages: number
}