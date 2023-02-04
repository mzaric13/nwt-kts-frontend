import { PointCreationDTO } from './point-creation-dto';

export interface RouteCreationDTO {
  routeName: string;
  startPoint: PointCreationDTO;
  endPoint: PointCreationDTO;
  expectedTime: number;
  length: number;
  routePath: PointCreationDTO[];
}
