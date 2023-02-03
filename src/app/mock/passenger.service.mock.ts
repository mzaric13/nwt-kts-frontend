import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { PassengerCreationDTO } from "../shared/models/passenger-creation-dto";
import { PassengerDTO } from "../shared/models/passenger-dto";

@Injectable()
export class PassengerServiceMock {

    constructor() {}

    public registerPassenger(passengerCreationDTO: PassengerCreationDTO) : Observable<PassengerDTO> {
        let passengerDTO: PassengerDTO = {
            id: 1,
            email: passengerCreationDTO.email,
            name: passengerCreationDTO.name,
            surname: passengerCreationDTO.surname,
            city: passengerCreationDTO.city,
            phoneNumber: passengerCreationDTO.phoneNumber,
            activated: false,
            profilePicture: '../../assets/default.jpg',
            blocked: false,
            favoriteRoutes: [],
            hasDrive: false,
            tokens: 600,
        };
        
        return of(passengerDTO);
    }

}