import { RouteDTO } from "./route-dto";
import { TagDTO } from "./tag-dto";
import { TypeDTO } from "./type-dto";

export default interface TempDriveDTO {
    startDate: Date;
    price: number;
    length: number;
    tags: TagDTO[];
    emails: string[];
    routeDTO: RouteDTO;
    typeDTO: TypeDTO;
}