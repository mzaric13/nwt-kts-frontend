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

describe('RegistrationComponent', () => {
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
      getRole: jasmine.createSpy('getRole').and.returnValue(of('')) 
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
