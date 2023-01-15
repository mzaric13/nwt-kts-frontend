import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouteCreationDTO } from '../models/route-creation-dto';
import { RouteDTO } from '../models/route-dto';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private url = environment.apiUrl;
  private requestMapping = '/routes/';

  constructor(private httpClient: HttpClient) {}

  public addRoute(routeCreationDTO: RouteCreationDTO) {
    return this.httpClient.post<RouteDTO>(
      this.url + this.requestMapping,
      routeCreationDTO,
      cabecera
    );
  }

  public getRouteById(id: number) {
    return this.httpClient.get<RouteDTO>(
      this.url + this.requestMapping + id,
      cabecera
    );
  }
}
