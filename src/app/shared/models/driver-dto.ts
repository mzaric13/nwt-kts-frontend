import { ImageDataDTO } from './image-data';
import { PointDTO } from './point-dto';
import { UserDTO } from './user-dto';
import { VehicleDTO } from './vehicle-dto';

export interface DriverDTO extends UserDTO {
  id: number;
  phoneNumber: string;
  password: string;
  vehicleDTO: VehicleDTO;
  blocked: boolean;
  available: boolean;
  location: PointDTO;
}
