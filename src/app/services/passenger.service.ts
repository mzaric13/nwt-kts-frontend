import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PassengerCreationDTO } from '../models/passenger-creation-dto';
import { PassengerDTO} from '../models/passenger-dto';
import { PasswordChangeCreationDTO } from '../models/password-change-creation-dto';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';
import { ProfilePictureCreationDTO } from '../models/profile-picture-creation-dto';
import { Observable } from 'rxjs';


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

  public getLoggedPassenger() : Observable<PassengerDTO>{
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
    return this.httpClient.get<PassengerDTO>(this.url + '/passengers/get-logged', newHeader);
  }

  public updatePersonalInfoPassenger(passengerDTO: PassengerDTO) {
    return this.httpClient.put<PassengerDTO>(this.url + '/passengers/update-personal-info', passengerDTO, cabecera);
  }

  public updatePassword(passwordChangeCreationDTO : PasswordChangeCreationDTO) {
    if (passwordChangeCreationDTO.newPassword != passwordChangeCreationDTO.newPasswordConfirmation) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Passwords don't match!",
        showConfirmButton: false,
        timer: 3000
      })
      throw new Error("Passwords don't match!");
    }
    else {
      return this.httpClient.put<PassengerDTO>(this.url + '/passengers/change-password', passwordChangeCreationDTO, cabecera);
    }
  }

  public changeProfilePicture(profilePictureCreationDTO: ProfilePictureCreationDTO) {
    return this.httpClient.put<PassengerDTO>(this.url + '/passengers/change-profile-picture', profilePictureCreationDTO, cabecera);
  }

  public addTokens(tokensToAdd: number, passengerDTO: PassengerDTO) {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
    return this.httpClient.put<PassengerDTO>(this.url + '/passengers/add-tokens/' + tokensToAdd, passengerDTO, newHeader);
  }

}