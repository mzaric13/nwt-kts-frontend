import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DriverCreationDTO } from '../models/driver-creation-dto';
import { DriverDTO } from '../models/driver-dto';
import Swal from 'sweetalert2';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class DriverService {
    
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public registerDriver(driverCreationDTO: DriverCreationDTO) {
    if (driverCreationDTO.password != driverCreationDTO.passwordConfirmation) {
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
      return this.httpClient.post<DriverDTO>(this.url + '/drivers/register', driverCreationDTO, cabecera);
    }
  }
}