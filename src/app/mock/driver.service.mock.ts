import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { DriverCreationDTO } from "../shared/models/driver-creation-dto";
import { DriverDTO } from "../shared/models/driver-dto";
import { PointDTO } from "../shared/models/point-dto";
import { VehicleDTO } from "../shared/models/vehicle-dto";

@Injectable()
export class DriverServiceMock {

    constructor() {}

    public registerDriver(driverCreationDTO: DriverCreationDTO) : Observable<DriverDTO> {

        if (driverCreationDTO.password !== driverCreationDTO.passwordConfirmation) {
            throw new Error("Passwords don't match!");
        }
        else {
            let vehicleDTO: VehicleDTO = {
                id: 1,
                registrationNumber: "AA000AA",
                name: "Nissan",
                type: "SUV"
            }
    
            let location: PointDTO = {
                latitude: 100,
                longitude: 100
            }
               
            let driverDTO: DriverDTO = {
                id: 1,
                email: driverCreationDTO.email,
                name: driverCreationDTO.name,
                surname: driverCreationDTO.surname,
                city: driverCreationDTO.city,
                phoneNumber: driverCreationDTO.phoneNumber,
                available: false,
                profilePicture: '../../assets/default.jpg',
                blocked: false,
                password: driverCreationDTO.password,
                vehicleDTO: vehicleDTO,
                location: location
            };
            
            return of(driverDTO);
        }
        
    }

}