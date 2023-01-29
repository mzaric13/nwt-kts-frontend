import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeDTO } from '../models/type-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  public getVehicleTypes() {
    let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()})};
    return this.httpClient.get<TypeDTO[]>(this.url + '/vehicles/get-all-vehicle-types', newHeader);
  }
}