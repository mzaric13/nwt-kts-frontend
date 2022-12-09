import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminDTO } from 'src/app/models/admin-dto';
import { TokenService } from 'src/app/services/token.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-modal-personal-info-change',
  templateUrl: './modal-personal-info-change.component.html',
  styleUrls: ['./modal-personal-info-change.component.css']
})
export class ModalPersonalInfoChangeComponent implements OnInit, AfterContentInit {
  personalInfoForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    surname: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    city: ['', [Validators.required, Validators.pattern("^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$")]],
    phoneNumber: ['', [Validators.required, Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{2}[-\\s.]?[0-9]{5,7}$")]],
  })

  //passenger 
  @Input() passenger!: PassengerDTO;
  @Output() passengerChange: EventEmitter<PassengerDTO> = new EventEmitter<PassengerDTO>();

  //admin
  @Input() admin!: AdminDTO;
  @Output() adminChange: EventEmitter<AdminDTO> = new EventEmitter<AdminDTO>();

  @Output() personalInfoModalClosed = new EventEmitter();

  displayStyle = "none";

  passengerForForm!: PassengerDTO;
  adminForForm!: AdminDTO;

  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService,
    private adminService: AdminService,
    private router: Router,
    private tokenService: TokenService
  ) { }
    
  ngOnInit(): void {
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
    //else if driver
  }

  ngAfterContentInit(): void {
    this.displayStyle = "block";
  }


  updatePersonalInfo() {
    if (this.getRole() === "ROLE_PASSENGER") {
      this.passenger = this.passengerForForm;
      this.passengerService.updatePersonalInfoPassenger(this.passenger).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title:  data.name + ' ' + data.surname + ', you have successfully changed your personal information.',
          showConfirmButton: false,
          timer: 3000
        })
        this.reloadPage();
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
    else if (this.getRole() === "ROLE_ADMIN") {
      this.admin = this.adminForForm;
      this.adminService.updatePersonalInfoAdmin(this.admin).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title:  data.name + ' ' + data.surname + ', you have successfully changed your personal information.',
          showConfirmButton: false,
          timer: 3000
        })
        this.reloadPage();
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
    //else if driver
  }

  closeModal() {
    this.personalInfoModalClosed.emit();
    if (this.getRole() === "ROLE_PASSENGER") {
      this.passengerForForm = JSON.parse(JSON.stringify(this.passenger));
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      this.adminForForm = JSON.parse(JSON.stringify(this.admin));
    }
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    if (this.getRole() === "ROLE_PASSENGER") {
      this.router.navigate(['/passenger-profile']);      
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      this.router.navigate(['/admin-profile'])
    }

  }

  getRole() {
    return this.tokenService.getRole();
  }

}
