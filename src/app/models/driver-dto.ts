import { VehicleDTO } from "./vehicle-dto";

export class DriverDTO {

    email: string;
    name: string;
    surname: string;
    city: string;
    phoneNumber: string;
    password: string;
    vehicleDTO: VehicleDTO;
    profilePicture: string;
    isBlocked: boolean;
    isAvailable: boolean;

    constructor(email: string, name: string, surname:string, city: string, phoneNumber: string, password: string,
        vehicleDTO: VehicleDTO, profilePicture: string, isBlocked: boolean, isAvailable: boolean){
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.vehicleDTO = vehicleDTO;
        this.profilePicture = profilePicture;
        this.isBlocked = isBlocked;
        this.isAvailable = isAvailable;
    }
    
}