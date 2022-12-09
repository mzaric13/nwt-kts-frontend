import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PasswordChangeCreationDTO } from '../models/password-change-creation-dto';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';
import { ProfilePictureCreationDTO } from '../models/profile-picture-creation-dto';
import { AdminDTO } from '../models/admin-dto';


const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public getLoggedAdministrator() {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
    return this.httpClient.get<AdminDTO>(this.url + '/administrators/get-logged', newHeader);
  }

  public updatePersonalInfoAdmin(adminDTO: AdminDTO) {
    return this.httpClient.put<AdminDTO>(this.url + '/administrators/update-personal-info', adminDTO, cabecera);
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
      return this.httpClient.put<AdminDTO>(this.url + '/administrators/change-password', passwordChangeCreationDTO, cabecera);
    }
  }

  public changeProfilePicture(profilePictureCreationDTO: ProfilePictureCreationDTO) {
    return this.httpClient.put<AdminDTO>(this.url + '/administrators/change-profile-picture', profilePictureCreationDTO, cabecera);
  }

}