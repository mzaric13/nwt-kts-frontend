import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { DriveDTO } from "../models/drive-dto";
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
    let newHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    return this.httpClient.post<number>(this.url + "/drives/create-temp-drive/", tempDrive, newHeader);
  }
  
  public sendConfirmationEmails(tempDriveId: number) {
    let newHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    return this.httpClient.get<void>(this.url + "/drives/send-confirmation-email/" + tempDriveId, newHeader);
  }

  public acceptDriveConsent(tempDriveId: number) {
    let params = new HttpParams();
    params = params.append('tempDriveId', tempDriveId);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
      params
    };
    return this.httpClient.put<void>(this.url + "/drives/accept-drive-consent", {}, options)
  }

  public rejectDriveConsent(tempDriveId: number, passengerId: number) {
    let params = new HttpParams();
    params = params.append('tempDriveId', tempDriveId);
    params = params.append('passengerId', passengerId);
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
      params
    };
    return this.httpClient.put<void>(this.url + "/drives/reject-drive-consent", {}, options)
  }

  public getDrive(driveId: number) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    return this.httpClient.get<DriveDTO>(this.url + "/drives/" + driveId, options);
  }

  reportInconsistency(drive: DriveDTO) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    return this.httpClient.put<void>(this.url + "/drives/report-inconsistency", drive, options);
  }

  endDrive(drive: DriveDTO) {
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.tokenService.getToken(),
      }),
    };
    return this.httpClient.put<void>(this.url + "/drives/end-drive", drive, options);
  }

}
