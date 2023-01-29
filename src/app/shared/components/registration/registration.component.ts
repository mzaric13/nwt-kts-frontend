import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DriverCreationDTO } from '../../models/driver-creation-dto';
import { PassengerCreationDTO } from '../../models/passenger-creation-dto';
import { TypeDTO } from '../../models/type-dto';
import { DriverService } from '../../services/driver.service';
import { PassengerService } from '../../services/passenger.service';
import { VehicleService } from '../../services/vehicle.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';
import { VehicleCreationDTO } from '../../models/vehicle-creation-dto';
import { PassengerDTO } from '../../models/passenger-dto';
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
    })
  });

  vehicleForm = this.formBuilder.group({
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
    this.role = this.tokenService.getRole();
    if (this.role === "ROLE_ADMIN"){
      this.vehicleService.getVehicleTypes().subscribe((t) => {
        this.types = t;
      })
    }
  }

  register(): void {
    if (this.role === "ROLE_ADMIN") {
      let vehicleCreationDTO = this.createVehicle();
      let driverCreationDTO = this.createDriver(vehicleCreationDTO);

      this.driverService.registerDriver(driverCreationDTO).subscribe(
        driverDTO => {
          Swal.fire({
            icon: 'success',
            position: 'center',
            title: 'You have been successfully registered. Welcome, ' + driverDTO.name + ' ' + driverDTO.surname + '!',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['/admin-profile']);
        },
        error => {
          Swal.fire({
            icon: 'error',
            position: 'center',
            title: error.error.apierror.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      )
    }
    else {
      let passengerCreationDTO = this.createPassenger();
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

  private createPassenger() {
    let passengerCreationDTO : PassengerCreationDTO = {
      email : this.registrationForm.controls['userGroup'].value.email as string,
      name : this.registrationForm.controls['userGroup'].value.name as string,
      surname : this.registrationForm.controls['userGroup'].value.surname as string,
      city : this.registrationForm.controls['userGroup'].value.city as string,
      phoneNumber :  this.registrationForm.controls['userGroup'].value.phoneNumber as string,
      password : this.registrationForm.controls['userGroup'].value.password as string,
      passwordConfirm : this.registrationForm.controls['userGroup'].value.confirmPassword as string,
    }
    return passengerCreationDTO;
  }

  private createDriver(vehicleCreationDTO: VehicleCreationDTO) {
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
    return driverCreationDTO;
  }

  private createVehicle() {
    let vehicleCreationDTO : VehicleCreationDTO = {
      registrationNumber : this.vehicleForm.controls['vehicleGroup'].value.registrationNumber as string,
      name : this.vehicleForm.controls['vehicleGroup'].value.vehicleName as string,
      type : this.vehicleForm.controls['vehicleGroup'].value.type as string
    }
    return vehicleCreationDTO;
  }
}
