import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RequestPage } from "../models/request-page";
import { RequestPageObject } from "../models/request-page-object";
import TempDriveDTO from "../models/temp-drive-dto";
import { TokenService } from "./token.service";

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
    providedIn: 'root',
  })
  export class DriveService {

    private url = environment.apiUrl;

    constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

    public getDrives(request:RequestPage) {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
            params: new HttpParams().set('page', request.page).set('size', request.size)};
        return this.httpClient.get<RequestPageObject>(this.url + '/drives/get-drives', newHeader);
    }

    public getDrivesForDriver(request:RequestPage) {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
            params: new HttpParams().set('page', request.page).set('size', request.size)};
        return this.httpClient.get<RequestPageObject>(this.url + '/drives/get-drives-for-driver', newHeader);
    }

    public getDrivesForPassenger(request:RequestPage) {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
            params: new HttpParams().set('page', request.page).set('size', request.size)};
        return this.httpClient.get<RequestPageObject>(this.url + '/drives/get-drives-for-passenger', newHeader);
    }

    public createTempDrive(tempDrive: TempDriveDTO) {
      return this.httpClient.post<void>(this.url + "/drives/create-temp-drive/", tempDrive, cabecera);
    }

  }
