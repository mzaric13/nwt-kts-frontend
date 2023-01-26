import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { TypeDTO } from "../models/type-dto";

@Injectable()
export class VehicleServiceMock {

    constructor() {}

    public getVehicleTypes() : Observable<TypeDTO[]> {        
        return of([]);
    }

}