import { RouteDTO } from './route-dto';

export interface PassengerDTO {
  id: number;
  email: string;
  name: string;
  surname: string;
  city: string;
  phoneNumber: string;
  password?: string;
  passwordConfirm?: string;
  profilePicture: string;
  activated: boolean;
  blocked: boolean;
  favoriteRoutes: RouteDTO[];
  hasDrive: boolean;
}
