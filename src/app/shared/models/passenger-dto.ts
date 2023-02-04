import { ImageDataDTO } from './image-data';
import { RouteDTO } from './route-dto';
import { UserDTO } from './user-dto';

export interface PassengerDTO extends UserDTO {
  id: number;
  phoneNumber: string;
  password?: string;
  passwordConfirm?: string;
  activated: boolean;
  blocked: boolean;
  favoriteRoutes: RouteDTO[];
  hasDrive: boolean;
  tokens: number;
}
