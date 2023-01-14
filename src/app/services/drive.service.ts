import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RequestPage } from "../models/request-page";
import { RequestPageObject } from "../models/request-page-object";
import { TokenService } from "./token.service";

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
        return this.httpClient.get(this.url + '/drives/get-drives-for-driver', newHeader);
    }

    public getDrivesForPassenger(request:RequestPage) {
        let newHeader = {headers: new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': 'Bearer ' + this.tokenService.getToken()}),
            params: new HttpParams().set('page', request.page).set('size', request.size)};
        return this.httpClient.get(this.url + '/drives/get-drives-for-passenger', newHeader);
    }

  }