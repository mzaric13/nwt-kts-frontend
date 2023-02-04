import { VehicleCreationDTO } from "./vehicle-creation-dto";

export interface DriverCreationDTO {

    email: string;
    name: string;
    surname: string;
    city: string;
    phoneNumber: string;
    password: string;
    passwordConfirmation: string;
    vehicleCreationDTO: VehicleCreationDTO;
}