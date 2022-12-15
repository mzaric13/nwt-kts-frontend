import { VehicleDTO } from "./vehicle-dto";

export interface DriverDTO {
    
    id: number;
    email: string;
    name: string;
    surname: string;
    city: string;
    phoneNumber: string;
    password: string;
    vehicleDTO: VehicleDTO;
    profilePicture: string;
    blocked: boolean;
    isAvailable: boolean;
    
}