import { TagDTO } from "./tag-dto";

export default interface CreateRide {
    passengers: string[];
    tags: TagDTO[];
    time: Date;
}