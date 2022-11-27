import { VehicleCreationDTO } from "./vehicle-creation-dto";

export class DriverCreationDTO {

    email: string;
    name: string;
    surname: string;
    city: string;
    phoneNumber: string;
    password: string;
    passwordConfirmation: string;
    vehicleCreationDTO: VehicleCreationDTO;

    constructor(email: string, name: string, surname:string, city: string, phoneNumber: string, password: string, passwordConfirm: string,
        registrationNumber: string, vehicleName: string, type: string){
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.passwordConfirmation = passwordConfirm;
        this.vehicleCreationDTO = new VehicleCreationDTO(registrationNumber, vehicleName, type)
    }
    
}