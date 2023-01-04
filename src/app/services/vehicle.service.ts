import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeDTO } from '../models/type-dto';

const cabecera = {headers: new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getVehicleTypes() {
    return this.httpClient.get<TypeDTO[]>(this.url + '/vehicles/get-all-vehicle-types');
  }

}