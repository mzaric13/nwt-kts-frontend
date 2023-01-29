import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PassengerDTO } from '../../models/passenger-dto';
import { PassengerService } from '../../services/passenger.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminDTO } from '../../models/admin-dto';
import { TokenService } from '../../services/token.service';
import { AdminService } from '../../services/admin.service';
import { DriverDTO } from '../../models/driver-dto';
import { DriverService } from '../../services/driver.service';
import { UpdatedUserDataCreationDTO } from '../../models/updated-user-data-creation-dto';

@Component({
  selector: 'app-modal-personal-info-change',
  templateUrl: './modal-personal-info-change.component.html',
  styleUrls: ['./modal-personal-info-change.component.css']
})
export class ModalPersonalInfoChangeComponent implements OnInit, AfterContentInit {
  personalInfoForm = this.formBuilder.group({
    name: ['Default', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    surname: ['Default', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    city: ['Default', [Validators.required, Validators.pattern("^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$")]],
    phoneNumber: ['0621111111', [Validators.required, Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{2}[-\\s.]?[0-9]{5,7}$")]],
  })

  //passenger 
  @Input() passenger!: PassengerDTO;
  @Output() passengerChange: EventEmitter<PassengerDTO> = new EventEmitter<PassengerDTO>();

  //admin
  @Input() admin!: AdminDTO;
  @Output() adminChange: EventEmitter<AdminDTO> = new EventEmitter<AdminDTO>();

  //driver
  @Input() driver!: DriverDTO;

  @Output() personalInfoModalClosed = new EventEmitter();

  displayStyle = "none";

  passengerForForm!: PassengerDTO;
  adminForForm!: AdminDTO;
  driverForForm!: DriverDTO;

  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService,
    private adminService: AdminService,
    private driverService: DriverService,
    private router: Router,
    private tokenService: TokenService
  ) { }
    
  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    if (this.getRole() === "ROLE_PASSENGER") {
      this.personalInfoForm.value.name = this.passenger.name;
      this.personalInfoForm.value.surname = this.passenger.surname;
      this.personalInfoForm.value.city = this.passenger.city;
      this.personalInfoForm.value.phoneNumber = this.passenger.phoneNumber;
      this.passengerForForm = JSON.parse(JSON.stringify(this.passenger));
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      this.personalInfoForm.value.name = this.admin.name;
      this.personalInfoForm.value.surname = this.admin.surname;
      this.personalInfoForm.value.city = this.admin.city;
      this.personalInfoForm.value.phoneNumber = this.admin.phoneNumber;
      this.adminForForm = JSON.parse(JSON.stringify(this.admin));
    }
    else if (this.getRole() === "ROLE_DRIVER") {
      this.personalInfoForm.value.name = this.driver.name;
      this.personalInfoForm.value.surname = this.driver.surname;
      this.personalInfoForm.value.city = this.driver.city;
      this.personalInfoForm.value.phoneNumber = this.driver.phoneNumber;
      this.driverForForm = JSON.parse(JSON.stringify(this.driver));
    }
    else {
      throw new Error("Unauthorized access to the page.");
    }
    this.displayStyle = "block";
  }

  updatePersonalInfo() {
    if (this.getRole() === "ROLE_PASSENGER") {
      this.updatePassenger();
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      this.updateAdmin();
    }
    else if (this.getRole() === "ROLE_DRIVER") {
      this.driverService.isUnansweredDriverDataPresent(this.driverForForm.email).subscribe(data => {
        if (!data.answered){
          Swal.fire({
            icon: 'error',
            position: 'center',
            title: 'Your previous personal data change request is still being looked at. Once it is accepted/declined, you will be notified.',
            showConfirmButton: false,
            timer: 3000
          })
        }
        else {
          this.createUpdatedUserData();
        }
      })
    }
  }

  updatePassenger(){
    this.passenger = this.passengerForForm;
    this.passengerService.updatePersonalInfoPassenger(this.passenger).subscribe(data => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title:  data.name + ' ' + data.surname + ', you have successfully changed your personal information.',
        showConfirmButton: false,
        timer: 3000
      })
      this.passengerChange.emit(data);
      this.closeModal();
    },
    error => {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'An unknown error has occured.',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

  updateAdmin(){
    this.admin = this.adminForForm;
      this.adminService.updatePersonalInfoAdmin(this.admin).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title:  data.name + ' ' + data.surname + ', you have successfully changed your personal information.',
          showConfirmButton: false,
          timer: 3000
        })
        this.adminChange.emit(data);
        this.closeModal();
      },
      error => {
        Swal.fire({
          icon: 'error',
          position: 'center',
          title: 'An unknown error has occured.',
          showConfirmButton: false,
          timer: 3000
        })
      })
  }

  createUpdatedUserData(){
    let updatedUserDataCreationDTO = this.createDriverData();
    this.driverService.updatePersonalInfoDriver(updatedUserDataCreationDTO).subscribe(data => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title: 'Your request for personal data change has been sent to an administrator.',
        showConfirmButton: false,
        timer: 3000
      })
      this.closeModal();
    },
    error => {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'An unknown error has occured.',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

  createDriverData() {
    let updatedUserDataCreationDTO : UpdatedUserDataCreationDTO = {
      name: this.driverForForm.name,
      city: this.driverForForm.city,
      surname: this.driverForForm.surname,
      phoneNumber: this.driverForForm.phoneNumber,
      email: this.driverForForm.email
    }
    return updatedUserDataCreationDTO;
  }

  closeModal() {
    this.personalInfoModalClosed.emit();
    if (this.getRole() === "ROLE_PASSENGER") {
      this.passengerForForm = JSON.parse(JSON.stringify(this.passenger));
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      this.adminForForm = JSON.parse(JSON.stringify(this.admin));
    }
    else if (this.getRole() === "ROLE_DRIVER") {
      this.driverForForm = JSON.parse(JSON.stringify(this.driver));
    }
  }

  getRole() {
    return this.tokenService.getRole();
  }

}
