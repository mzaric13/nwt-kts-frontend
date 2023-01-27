import { HttpClient } from "@angular/common/http";
import { PassengerService } from "../services/passenger.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, getTestBed, TestBed, tick } from "@angular/core/testing";
import { PassengerDTO } from "../models/passenger-dto";
import { environment } from "src/environments/environment";
import { PassengerCreationDTO } from "../models/passenger-creation-dto";

describe('Passenger service', () => {

    let injector;
    let passengerService: PassengerService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;

    let url = environment.apiUrl;

	beforeEach(() => {

        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers:    [PassengerService ]
        });

        injector = getTestBed();
        passengerService = TestBed.inject(PassengerService);
        httpClient = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });
         
    it('should pass simple test', () => {
        expect(true).toBe(true);
    });

    it('get all activated passengers', () => {
        let passengers: PassengerDTO[];
    
        const mockPassengers: PassengerDTO[] = [
            {
                id: 1,
                email: 'zare@gmail.com',
                name: 'Petar',
                surname: 'Petrovic',
                activated: true,
                city: 'Novi Sad',
                phoneNumber: '0634567777',
                blocked: false,
                favoriteRoutes: [],
                profilePicture: '../../assets/default.jpg'
            }
        ];

        passengerService.getAllActivatedPassengers().subscribe(data => {
            passengers = data;        
          });
          
          const req = httpMock.expectOne(url + '/passengers/activated-passengers');
          expect(req.request.method).toBe('GET');
          req.flush(mockPassengers);
    });

    it('register passenger', fakeAsync(() => {
        let passengerCreationDTO: PassengerCreationDTO = {
            email: 'zare@gmail.com',
            name: 'Matija',
            surname: 'Zaric',
            password: 'lozinka1',
            passwordConfirm: 'lozinka1',
            city: 'Novi Sad',
            phoneNumber: '0658987777'
        };

        let passengerDTO: PassengerDTO = {
            id: 1,
            email: 'zare@gmail.com',
            name: 'Matija',
            surname: 'Zaric',
            activated: false,
            blocked: false,
            city: 'Novi Sad',
            favoriteRoutes: [],
            phoneNumber: '0658987777',
            profilePicture: '../../assets/default.jpg'
        }

        passengerService.registerPassenger(passengerCreationDTO).subscribe(res => passengerDTO = res);

        const req = httpMock.expectOne(url + '/passengers/register');
        expect(req.request.method).toBe('POST');
        req.flush(passengerDTO);

        tick();
        expect(passengerDTO).toBeDefined();
        expect(passengerDTO.id).toEqual(1);
        expect(passengerDTO.email).toEqual('zare@gmail.com');
        expect(passengerDTO.phoneNumber).toEqual('0658987777');
    }))

})