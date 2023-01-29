import { PointCreationDTO } from './point-creation-dto';

export interface RouteDTO {
  id: number;
  routeName: string;
  expectedTime: number;
  length: number;
  waypoints: PointCreationDTO[];
  routeIdx: number;
}
