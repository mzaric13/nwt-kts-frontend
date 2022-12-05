import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PassengerCreationDTO } from '../models/passenger-creation-dto';
import { PassengerDTO} from '../models/passenger-dto';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';


const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
    
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public registerPassenger(passengerCreationDTO: PassengerCreationDTO) {
    if (passengerCreationDTO.password != passengerCreationDTO.passwordConfirm) {
       Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Passwords don't match!",
        showConfirmButton: false,
        timer: 3000
        })
        throw new Error("Passwords don't match!");
    }
    else{
      return this.httpClient.post<PassengerDTO>(this.url + '/passengers/register', passengerCreationDTO, cabecera);
    }   
  }

  public getLoggedPassenger() {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
    return this.httpClient.get<PassengerDTO>(this.url + '/passengers/get-logged', newHeader);
  }

}