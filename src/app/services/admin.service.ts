import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PasswordChangeCreationDTO } from '../models/password-change-creation-dto';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';
import { ProfilePictureCreationDTO } from '../models/profile-picture-creation-dto';
import { AdminDTO } from '../models/admin-dto';
import { AnsweredDriverDataCreationDTO } from '../models/answered-driver-data-creation-dto';
import { DriverDataDTO } from '../models/driver-data-dto';
import { DriverDTO } from '../models/driver-dto';
import { PassengerDTO } from '../models/passenger-dto';
import { UserIdDTO } from '../models/user-id-dto';
import { DatesChartDTO } from '../models/dates-chart-dto';
import { ChartCreationDTO } from '../models/chart-creation-dto';


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

  public answerDataChangeRequest(answeredDriverDataCreationDTO : AnsweredDriverDataCreationDTO){
    return this.httpClient.put<DriverDataDTO>(this.url + '/administrators/answer-driver-data-change', answeredDriverDataCreationDTO, cabecera);
  }

  public getUnansweredDriverDataRequests() {
    return this.httpClient.get<DriverDataDTO[]>(this.url + '/administrators/get-unanswered-driver-data', cabecera);
  }

  public getAllDrivers() {
    return this.httpClient.get<DriverDTO[]>(this.url + '/administrators/get-all-drivers', cabecera);
  }

  public getAllPassengers() {
    return this.httpClient.get<PassengerDTO[]>(this.url + '/administrators/get-all-passengers', cabecera);
  }

  public changeBlockedStatusPassenger(userIdDTO : UserIdDTO) {
    return this.httpClient.put<PassengerDTO>(this.url + '/administrators/change-block-status-passenger', userIdDTO, cabecera);
  }

  public changeBlockedStatusDriver(userIdDTO : UserIdDTO) {
    return this.httpClient.put<DriverDTO>(this.url + '/administrators/change-block-status-driver', userIdDTO, cabecera);
  }

  public createAdminChart(datesChartDTO: DatesChartDTO) {
    let newHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };

    return this.httpClient.post<ChartCreationDTO>(this.url + '/administrators/create-admin-chart', datesChartDTO, newHeader);
  }
}