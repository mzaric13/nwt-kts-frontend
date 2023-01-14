import { DriverDTO } from "./driver-dto";
import { PassengerDTO } from "./passenger-dto";
import { RouteDTO } from "./route-dto";
import { Status } from "./status";
import { TagDTO } from "./tag-dto";

export interface DriveDTO {
    
    id: number,
    startDate: Date,
    endDate: Date,
    price: number,
    length: number,
    inconsistentDriveReasoning: string,
    tags: TagDTO[];
    status: Status,
    driver: DriverDTO,
    passengers: PassengerDTO[],
    route: RouteDTO
}