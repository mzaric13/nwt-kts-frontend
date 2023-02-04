import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DriverCreationDTO } from '../models/driver-creation-dto';
import { DriverDTO } from '../models/driver-dto';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';
import { PasswordChangeCreationDTO } from '../models/password-change-creation-dto';
import { ProfilePictureCreationDTO } from '../models/profile-picture-creation-dto';
import { UpdatedUserDataCreationDTO } from '../models/updated-user-data-creation-dto';
import { DriverDataAnsweredDTO } from '../models/driver-data-answered-dto';
import { DatesChartDTO } from '../models/dates-chart-dto';
import { ChartCreationDTO } from '../models/chart-creation-dto';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private url = environment.apiUrl;
  newHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getToken(),
    })
  }

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}
  

  public getAllDrivers() {
    return this.httpClient.get<DriverDTO[]>(this.url + '/drivers/');
  }

  public registerDriver(driverCreationDTO: DriverCreationDTO) {
    if (driverCreationDTO.password !== driverCreationDTO.passwordConfirmation) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Passwords don't match!",
        showConfirmButton: false,
        timer: 3000,
      });
      throw new Error("Passwords don't match!");
    } else {
      return this.httpClient.post<DriverDTO>(
        this.url + '/drivers/register',
        driverCreationDTO,
        this.newHeader
      );
    }
  }

  public getLoggedDriver() {
    return this.httpClient.get<DriverDTO>(
      this.url + '/drivers/get-logged',
      this.newHeader
    );
  }

  public updatePersonalInfoDriver(
    updatedUserDataCreationDTO: UpdatedUserDataCreationDTO
  ) {
    return this.httpClient.post<DriverDTO>(
      this.url + '/drivers/send-update-request',
      updatedUserDataCreationDTO,
      this.newHeader
    );
  }

  public updatePassword(passwordChangeCreationDTO: PasswordChangeCreationDTO) {
    if (
      passwordChangeCreationDTO.newPassword !==
      passwordChangeCreationDTO.newPasswordConfirmation
    ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Passwords don't match!",
        showConfirmButton: false,
        timer: 3000,
      });
      throw new Error("Passwords don't match!");
    } else {
      return this.httpClient.put<DriverDTO>(
        this.url + '/drivers/change-password',
        passwordChangeCreationDTO,
        this.newHeader
      );
    }
  }

  public changeProfilePicture(image: File) {
    const header = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    const formData = new FormData(); 
    formData.append("image", image, image.name);
    return this.httpClient.put<DriverDTO>(this.url + '/drivers/change-profile-picture', formData, header);
  }

  public isUnansweredDriverDataPresent(email: string) {
    let url = `${this.url}/drivers/is-unanswered-driver-data-present/${email}`;
    return this.httpClient.get<DriverDataAnsweredDTO>(url, this.newHeader);
  }

  public createDriverChart(datesChartDTO: DatesChartDTO) {
    return this.httpClient.post<ChartCreationDTO>(this.url + '/drivers/create-driver-chart', datesChartDTO, this.newHeader);
  }

  public changeStatus() {
    return this.httpClient.get<DriverDTO>(this.url + '/drivers/change-status', this.newHeader);
  }
}
