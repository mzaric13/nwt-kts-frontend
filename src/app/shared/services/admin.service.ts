import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { RequestPageObject } from '../models/request-page-object';
import { RequestPage } from '../models/request-page';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    
  private url = environment.apiUrl;

  newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public getLoggedAdministrator() {

    return this.httpClient.get<AdminDTO>(this.url + '/administrators/get-logged', this.newHeader);
  }

  public updatePersonalInfoAdmin(adminDTO: AdminDTO) {
    return this.httpClient.put<AdminDTO>(this.url + '/administrators/update-personal-info', adminDTO, this.newHeader);
  }

  public updatePassword(passwordChangeCreationDTO : PasswordChangeCreationDTO) {
    if (passwordChangeCreationDTO.newPassword !== passwordChangeCreationDTO.newPasswordConfirmation) {
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
      return this.httpClient.put<AdminDTO>(this.url + '/administrators/change-password', passwordChangeCreationDTO, this.newHeader);
    }
  }

  public changeProfilePicture(profilePictureCreationDTO: ProfilePictureCreationDTO) {
    return this.httpClient.put<AdminDTO>(this.url + '/administrators/change-profile-picture', profilePictureCreationDTO, this.newHeader);
  }

  public answerDataChangeRequest(answeredDriverDataCreationDTO : AnsweredDriverDataCreationDTO){
    return this.httpClient.put<DriverDataDTO>(this.url + '/administrators/answer-driver-data-change', answeredDriverDataCreationDTO, this.newHeader);
  }

  public getUnansweredDriverDataRequests(request:RequestPage) {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
    params: new HttpParams().set('page', request.page).set('size', request.size)};
    return this.httpClient.get<RequestPageObject>(this.url + '/administrators/get-unanswered-driver-data', newHeader);
  }

  public getAllDrivers(request:RequestPage) {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
    params: new HttpParams().set('page', request.page).set('size', request.size)};
    return this.httpClient.get<RequestPageObject>(this.url + '/administrators/get-all-drivers', newHeader);
  }

  public getAllPassengers(request:RequestPage) {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
    params: new HttpParams().set('page', request.page).set('size', request.size)};
    return this.httpClient.get<RequestPageObject>(this.url + '/administrators/get-all-passengers', newHeader);
  }

  public getAllActivePassengers(request:RequestPage) {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
    params: new HttpParams().set('page', request.page).set('size', request.size)};
    return this.httpClient.get<RequestPageObject>(this.url + '/administrators/get-all-active-passengers', newHeader);
  }

  public changeBlockedStatusPassenger(userIdDTO : UserIdDTO) {
    return this.httpClient.put<PassengerDTO>(this.url + '/administrators/change-block-status-passenger', userIdDTO, this.newHeader);
  }

  public changeBlockedStatusDriver(userIdDTO : UserIdDTO) {
    return this.httpClient.put<DriverDTO>(this.url + '/administrators/change-block-status-driver', userIdDTO, this.newHeader);
  }

  public createAdminChart(datesChartDTO: DatesChartDTO) {
    return this.httpClient.post<ChartCreationDTO>(this.url + '/administrators/create-admin-chart', datesChartDTO, this.newHeader);
  }
}