import { PointCreationDTO } from './point-creation-dto';

export interface RouteDTO {
  id: number;
  routeName: string;
  startPoint: PointCreationDTO;
  endPoint: PointCreationDTO;
  expectedTime: number;
  length: number;
  routePath: PointCreationDTO[];
}
