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
import { VehicleCreationDTO } from 'src/app/models/vehicle-creation-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  types: TypeDTO[] = [];

  role: string | null | undefined;

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
    private driverService: DriverService,
    private tokenService: TokenService,
    private router: Router
    ) { }

  ngOnInit(): void {
    //ucitati tipove vozila sa backa ako je admin taj koji je ulogovan (dodati uslov za admina)
    this.role = this.tokenService.getRole();
    if (this.role === "ROLE_ADMIN"){
      this.vehicleService.getVehicleTypes().subscribe((t) => {
        this.types = t;
      })
    }
  }

  register(): void {
    //if role == admin onda vozaca, else putnika registrujemo
    if (this.role === "ROLE_ADMIN") {

      let vehicleCreationDTO : VehicleCreationDTO = {
        registrationNumber : this.registrationForm.controls['vehicleGroup'].value.registrationNumber as string,
        name : this.registrationForm.controls['vehicleGroup'].value.vehicleName as string,
        type : this.registrationForm.controls['vehicleGroup'].value.type as string
      }

      let driverCreationDTO : DriverCreationDTO = {
        email : this.registrationForm.controls['userGroup'].value.email as string,
        name : this.registrationForm.controls['userGroup'].value.name as string,
        surname : this.registrationForm.controls['userGroup'].value.surname as string,
        city : this.registrationForm.controls['userGroup'].value.city as string,
        phoneNumber :  this.registrationForm.controls['userGroup'].value.phoneNumber as string,
        password : this.registrationForm.controls['userGroup'].value.password as string,
        passwordConfirmation : this.registrationForm.controls['userGroup'].value.confirmPassword as string,
        vehicleCreationDTO : vehicleCreationDTO

      }

      this.driverService.registerDriver(driverCreationDTO).subscribe(
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
      let passengerCreationDTO : PassengerCreationDTO = {
        email : this.registrationForm.controls['userGroup'].value.email as string,
        name : this.registrationForm.controls['userGroup'].value.name as string,
        surname : this.registrationForm.controls['userGroup'].value.surname as string,
        city : this.registrationForm.controls['userGroup'].value.city as string,
        phoneNumber :  this.registrationForm.controls['userGroup'].value.phoneNumber as string,
        password : this.registrationForm.controls['userGroup'].value.password as string,
        passwordConfirm : this.registrationForm.controls['userGroup'].value.confirmPassword as string,
      }
      this.passengerService.registerPassenger(passengerCreationDTO).subscribe({ 
        next: (passengerDTO: PassengerDTO) => {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: 'Please check your email to confirm registration ' + passengerDTO.name + ' ' + passengerDTO.surname + '.',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigate(['/']);
        },
        error : (error) => {
          Swal.fire({
            icon: 'error',
            position: 'center',
            title: error.error.apierror.message,
            showConfirmButton: false,
            timer: 3000,
          }) 
        }
      })
    }
  }
}
