import { VehicleDTO } from './vehicle-dto';

export interface DriverDTO {
  email: string;
  name: string;
  surname: string;
  city: string;
  phoneNumber: string;
  password: string;
  vehicleDTO: VehicleDTO;
  profilePicture: string;
  blocked: boolean;
  available: boolean;
  geoLocation?: number[];
}
