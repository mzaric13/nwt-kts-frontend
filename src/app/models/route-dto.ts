import { PointDTO } from "./point-dto";

export interface RouteDTO {
    id: number,
    routeName: string,
    expectedTime: number,
    length: number,
    waypoints: PointDTO[]
}