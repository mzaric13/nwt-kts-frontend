import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import TempDriveDTO from '../models/temp-drive-dto';

const cabecera = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  private url = environment.apiUrl + "/drives/";

  constructor(
    private httpClient: HttpClient,
  ) { }
  
  public createTempDrive(tempDrive: TempDriveDTO) {
    return this.httpClient.post<void>(this.url + "create-temp-drive/", tempDrive, cabecera);
  }
}
