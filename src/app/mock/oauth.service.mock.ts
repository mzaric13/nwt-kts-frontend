import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { DriverCreationDTO } from "../shared/models/driver-creation-dto";
import { DriverDTO } from "../shared/models/driver-dto";
import { PointDTO } from "../shared/models/point-dto";
import { JwtToken, LoginEmailPassword } from "../shared/models/token-dto";
import { VehicleDTO } from "../shared/models/vehicle-dto";

@Injectable()
export class OAuthServiceMock {

    constructor() {}

    public credentials(loginData: LoginEmailPassword) {
        let token: JwtToken = new JwtToken("eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJud3Qta3RzLWFwcCIsInN1YiI6ImRhcmtvLmRhcmtvdmljQGdtYWlsLmNvbSIsImF1ZCI6IndlYiIsImlhdCI6MTY3NTEwNjMwMiwicm9sZSI6IlJPTEVfUEFTU0VOR0VSIiwiZXhwIjoxNjc1MTA4MTAyfQ.kJ89wTwPKerMibsftkUUq0vaiRNd0FxKRV-fNbBxLGXP6ks_oj85wQwhh4xVkf1k-D4Qhv9AS_V1wJo803Apmg", 1800000);
        return of(token);
    }

}