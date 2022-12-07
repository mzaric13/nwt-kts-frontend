import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DriverCreationDTO } from 'src/app/models/driver-creation-dto';
import { PassengerCreationDTO } from 'src/app/models/passenger-creation-dto';
import { TypeDTO } from 'src/app/models/type-dto';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from '../../services/passenger.service';
import { VehicleService } from '../../services/vehicle.service';
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  types: TypeDTO[] = [];
  tokenService: TokenService = new TokenService;

  registrationForm = this.formBuilder.group({
    userGroup: this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]],
      name: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
      city: ['', [Validators.required, Validators.pattern("^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$")]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{2}[-\\s.]?[0-9]{5,7}$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }),
    vehicleGroup: this.formBuilder.group({
      registrationNumber: ['', [Validators.required, Validators.pattern("([A-Za-z])([A-Za-z])([0-9][0-9][0-9])([A-Za-z])([A-Za-z])")]],
      vehicleName: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })
  });


  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService,
    private vehicleService: VehicleService,
    private driverService: DriverService
    ) { }

  ngOnInit(): void {
    //ucitati tipove vozila sa backa ako je admin taj koji je ulogovan (dodati uslov za admina)
    if (this.tokenService.getRole() === "ROLE_ADMIN"){
      this.vehicleService.getVehicleTypes().subscribe((t) => {
        this.types = t;
      })
    }
  }

  register(): void {
    //if role == admin onda vozaca, else putnika registrujemo
    if (this.tokenService.getRole() === "ROLE_ADMIN") {
      this.driverService.registerDriver(new DriverCreationDTO(this.registrationForm.controls['userGroup'].value.email as string,
      this.registrationForm.controls['userGroup'].value.name as string, this.registrationForm.controls['userGroup'].value.surname as string,
      this.registrationForm.controls['userGroup'].value.city as string, this.registrationForm.controls['userGroup'].value.phoneNumber as string,
      this.registrationForm.controls['userGroup'].value.password as string, this.registrationForm.controls['userGroup'].value.confirmPassword as string,
      this.registrationForm.controls['vehicleGroup'].value.registrationNumber as string, this.registrationForm.controls['vehicleGroup'].value.vehicleName as string,
      this.registrationForm.controls['vehicleGroup'].value.type as string)).subscribe(
        driverDTO => {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: 'You have been successfully registered. Welcome, ' + driverDTO.name + ' ' + driverDTO.surname + '!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title: 'Email or registration number is already taken!',
              showConfirmButton: false,
              timer: 3000
            })
          } else {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title: 'An unknown error happened.',
              showConfirmButton: false,
              timer: 3000
            })
          }
        }
      )
    }
    else {
      this.passengerService.registerPassenger(new PassengerCreationDTO(this.registrationForm.controls['userGroup'].value.email as string, 
      this.registrationForm.controls['userGroup'].value.name as string, this.registrationForm.controls['userGroup'].value.surname as string,
      this.registrationForm.controls['userGroup'].value.city as string, this.registrationForm.controls['userGroup'].value.phoneNumber as string, 
      this.registrationForm.controls['userGroup'].value.password as string, this.registrationForm.controls['userGroup'].value.confirmPassword as string)).subscribe(
        passengerDTO => {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: 'Please check your email to confirm registration ' + passengerDTO.name + ' ' + passengerDTO.surname + '.',
            showConfirmButton: false,
            timer: 3000
          })
        },
        error => {
          if (error.status === 409) {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title: 'Email is already taken!',
              showConfirmButton: false,
              timer: 3000,
            })
          } else {
            Swal.fire({
              icon: 'error',
              position: 'center',
              title: 'An unknown error happened.',
              showConfirmButton: false,
              timer: 3000
            })
          }
        }
      )
    }
  }
}
