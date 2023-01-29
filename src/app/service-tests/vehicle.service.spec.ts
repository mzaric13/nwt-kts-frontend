import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { TypeDTO } from "../shared/models/type-dto";
import { DriverService } from "../shared/services/driver.service";
import { VehicleService } from "../shared/services/vehicle.service";

describe('Vehicle service', () => {

    let injector;
    let vehicleService: VehicleService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let url = environment.apiUrl;

	beforeEach(() => {

        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [DriverService]
        });

        injector = getTestBed();
        vehicleService = TestBed.inject(VehicleService);
        httpClient = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
         
    it('should pass simple test', () => {
        expect(true).toBe(true);
    });

    it('get all vehicles', fakeAsync(() => {
        let types: TypeDTO[];
        const mockTypes: TypeDTO[] = [
            {
                id: 1,
                name: "SUV"
            },
            {
                id: 2,
                name: "Crossover"
            },
            {
                id: 3,
                name: "Sedan"
            }
        ];

        vehicleService.getVehicleTypes().subscribe(res => types = res);

        const req = httpMock.expectOne(url + '/vehicles/get-all-vehicle-types');
        expect(req.request.method).toBe('GET');
        req.flush(mockTypes);

        tick();
        expect(mockTypes).toBeDefined();
        expect(mockTypes.length).toEqual(3);
    }))

})