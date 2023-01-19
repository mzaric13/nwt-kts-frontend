import { TagDTO } from "./tag-dto";
import { TypeDTO } from "./type-dto";

export default interface CreateRide {
    passengers: string[];
    tags: TagDTO[];
    time: Date;
    typeDTO: TypeDTO;
}