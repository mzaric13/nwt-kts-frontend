import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from "@angular/core/testing";
import { environment } from "src/environments/environment";
import { DriverCreationDTO } from "../shared/models/driver-creation-dto";
import { DriverDTO } from "../shared/models/driver-dto";
import { PointDTO } from "../shared/models/point-dto";
import { VehicleCreationDTO } from "../shared/models/vehicle-creation-dto";
import { VehicleDTO } from "../shared/models/vehicle-dto";
import { DriverService } from "../shared/services/driver.service";

describe('Driver service', () => {

    let injector;
    let driverService: DriverService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let url = environment.apiUrl;

	beforeEach(() => {

        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [DriverService]
        });

        injector = getTestBed();
        driverService = TestBed.inject(DriverService);
        httpClient = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
         
    it('should pass simple test', () => {
        expect(true).toBe(true);
    });

    it('register driver', fakeAsync(() => {

        let vehicleCreationDTO: VehicleCreationDTO = {
            registrationNumber: "ZZ000ZZ",
            name: "Suzuki",
            type: "SUV"
        }

        let driverCreationDTO: DriverCreationDTO = {
            email: "driver@gmail.com",
            name: "Janko",
            surname: "Jankovic",
            city: "Novi Sad",
            phoneNumber: "0211231231",
            password: "sifra123",
            passwordConfirmation: "sifra123",
            vehicleCreationDTO: vehicleCreationDTO
        };

        let vehicleDTO: VehicleDTO = {
            id: 1,
            registrationNumber: "ZZ000ZZ",
            name: "Suzuki",
            type: "SUV"
        }

        let pointDTO: PointDTO = {
            latitude: 100,
            longitude: 100
        }

        let driverDTO: DriverDTO = {
            id: 1,
            email: "driver@gmail.com",
            name: "Janko",
            surname: "Jankovic",
            city: "Novi Sad",
            phoneNumber: "0211231231",
            password: "sifra123",
            vehicleDTO: vehicleDTO,
            profilePicture: 'picture.jpg',
            blocked: false,
            available: true,
            location: pointDTO
        }

        driverService.registerDriver(driverCreationDTO).subscribe(res => driverDTO = res);

        const req = httpMock.expectOne(url + '/drivers/register');
        expect(req.request.method).toBe('POST');
        req.flush(driverDTO);

        tick();
        expect(driverDTO).toBeDefined();
        expect(driverDTO.id).toEqual(1);
        expect(driverDTO.email).toEqual("driver@gmail.com");
        expect(driverDTO.phoneNumber).toEqual("0211231231");
    }))

})