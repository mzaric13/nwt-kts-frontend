import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { PassengerServiceMock } from 'src/app/mock/passenger.service.mock';
import { PassengerCreationDTO } from 'src/app/models/passenger-creation-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { UserService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { TokenService } from 'src/app/services/token.service';

import { RegistrationComponent } from './registration.component';
import { Router } from '@angular/router';
import { DriverServiceMock } from 'src/app/mock/driver.service.mock';
import { VehicleServiceMock } from 'src/app/mock/vehicle.service.mock';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegistrationComponent', () => {

  describe('Passenger registration', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let passengerService: any;
    let tokenService: any;
    let router: any;
  
    beforeEach(async () => {
      let routerMock = {
        navigate: jasmine.createSpy('navigate')
      };
      let tokenServiceMock = {
        getRole: jasmine.createSpy('getRole').and.returnValue(''),
        getToken: jasmine.createSpy('getToken').and.returnValue('') 
      }
  
      await TestBed.configureTestingModule({
        declarations: [ RegistrationComponent ],
        imports: [
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule
        ],
        providers: [
          {provide: PassengerService, useClass: PassengerServiceMock},
          {provide: DriverService, useClass: DriverServiceMock},
          {provide: TokenService, useValue: tokenServiceMock},
          {provide: Router, useValue: routerMock }
        ]
      })
      .compileComponents();
      fixture = TestBed.createComponent(RegistrationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RegistrationComponent);
  
      component = fixture.componentInstance; // ContactComponent test instance
        // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      passengerService = TestBed.inject(PassengerService);
      tokenService = TestBed.inject(TokenService);
      router = TestBed.inject(Router);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it(`form should be invalid because of email`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0653211323');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be invalid because of name`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0653211323');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be invalid because of surname`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0653211323');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be invalid because of city`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0653211323');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be invalid because of phone number`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('asgasgasgasg');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be invalid because of password`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0634561232');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be invalid because of confirm password`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0634561232');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('loznka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('');
      expect(component.registrationForm.valid).toBeFalsy();
    })
  
    it(`form should be valid`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0634561232');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('loznika1');
      expect(component.registrationForm.valid).toBeTrue();
    })
  
    it(`should register`, () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('zare@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Matija');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Zaric');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Novi Sad');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0634561232');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('lozinka1');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('lozinka');
  
      component.register();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    })
  });  

  describe('Driver registration', () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let passengerService: any;
    let tokenService: any;
    let router: any;

    beforeEach(async () => {
      let routerMock = {
        navigate: jasmine.createSpy('navigate')
      };
      let tokenServiceMock = {
        getRole: jasmine.createSpy('getRole').and.returnValue('ROLE_ADMIN'),
        getToken: jasmine.createSpy('getToken').and.returnValue('') 
      }

      await TestBed.configureTestingModule({
        declarations: [ RegistrationComponent ],
        imports: [
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientModule,
          MatSelectModule,
          MatOptionModule,
          MatFormFieldModule,
          BrowserAnimationsModule,
        ],
        providers: [
          {provide: PassengerService, useClass: PassengerServiceMock},
          {provide: DriverService, useClass: DriverServiceMock},
          {provide: VehicleService, useClass: VehicleServiceMock},
          {provide: TokenService, useValue: tokenServiceMock},
          {provide: Router, useValue: routerMock}
        ]
      })
      .compileComponents();
      fixture = TestBed.createComponent(RegistrationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(RegistrationComponent);

      component = fixture.componentInstance; // ContactComponent test instance
        // query for the title <h1> by CSS element selector
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      passengerService = TestBed.inject(PassengerService);
      tokenService = TestBed.inject(TokenService);
      router = TestBed.inject(Router);
    });

    /* DRIVER REGISTRATION */

    it('Driver form should be INVALID because EMAIL is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because EMAIL is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('invalidemail');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because NAME is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because NAME is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });
    
    it('Driver form should be INVALID because SURNAME is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because SURNAME is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because CITY is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because CITY is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('111111111');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because NUMBER is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because NUMBER is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('aaaaaaaaaaa');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because PASSWORD is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because CONFIRM PASSWORD is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeFalsy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be INVALID because PASSWORD and CONFIRM PASSWORD are not the same', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('nijesifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('AA000AA');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');
      component.ngOnInit();
      expect(function(){ component.register();}).toThrow(new Error("Passwords don't match!"));
    });

    it('Driver form should be INVALID because REGISTRATION NUMBER is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeTruthy();
      expect(component.vehicleForm.valid).toBeFalsy();
    });

    it('Driver form should be INVALID because REGISTRATION NUMBER is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('XXXXXXX');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeTruthy();
      expect(component.vehicleForm.valid).toBeFalsy();
    });

    it('Driver form should be INVALID because VEHICLE NAME is not entered', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('XX000XX');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeTruthy();
      expect(component.vehicleForm.valid).toBeFalsy();
    });

    it('Driver form should be INVALID because TYPE is not valid', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('XX000XX');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('');

      expect(component.registrationForm.valid).toBeTruthy();
      expect(component.vehicleForm.valid).toBeFalsy();
    });

    it('Driver form should be VALID', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('XX000XX');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeTruthy();
      expect(component.vehicleForm.valid).toBeTruthy();
    });

    it('Driver form should be VALID and driver should be REGISTERED', () => {
      component.registrationForm.controls['userGroup'].controls['email'].setValue('milan.milanovic@gmail.com');
      component.registrationForm.controls['userGroup'].controls['name'].setValue('Milan');
      component.registrationForm.controls['userGroup'].controls['surname'].setValue('Milanovic');
      component.registrationForm.controls['userGroup'].controls['city'].setValue('Subotica');
      component.registrationForm.controls['userGroup'].controls['phoneNumber'].setValue('0213456789');
      component.registrationForm.controls['userGroup'].controls['password'].setValue('sifra123');
      component.registrationForm.controls['userGroup'].controls['confirmPassword'].setValue('sifra123');

      component.vehicleForm.controls['vehicleGroup'].controls['registrationNumber'].setValue('XX000XX');
      component.vehicleForm.controls['vehicleGroup'].controls['vehicleName'].setValue('Nissan');
      component.vehicleForm.controls['vehicleGroup'].controls['type'].setValue('SUV');

      expect(component.registrationForm.valid).toBeTruthy();
      expect(component.vehicleForm.valid).toBeTruthy();

      component.ngOnInit();
      component.register();
      expect(router.navigate).toHaveBeenCalledWith(['/admin-profile']);

      });
  });
});
