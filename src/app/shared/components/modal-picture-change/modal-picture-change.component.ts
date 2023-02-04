import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDTO } from '../../models/admin-dto';
import { DriverDTO } from '../../models/driver-dto';
import { PassengerDTO } from '../../models/passenger-dto';
import { ProfilePictureCreationDTO } from '../../models/profile-picture-creation-dto';
import { AdminService } from '../../services/admin.service';
import { DriverService } from '../../services/driver.service';
import { PassengerService } from '../../services/passenger.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-picture-change',
  templateUrl: './modal-picture-change.component.html',
  styleUrls: ['./modal-picture-change.component.css']
})
export class ModalPictureChangeComponent implements OnInit {

  //passenger
  @Input() passenger!: PassengerDTO;
  @Output() passengerChange: EventEmitter<PassengerDTO> = new EventEmitter<PassengerDTO>();

  //admin
  @Input() admin!: AdminDTO;
  @Output() adminChange: EventEmitter<AdminDTO> = new EventEmitter<AdminDTO>();

  //driver
  @Input() driver!: DriverDTO;
  @Output() driverChange: EventEmitter<DriverDTO> = new EventEmitter<DriverDTO>();

  @Output() profilePictureChangeModalClosed = new EventEmitter();

  newProfilePicture!: string;

  uploadedImage!: File;

  displayStyle = "none";

  fileName = 'asf';

  constructor(
    private passengerService: PassengerService,
    private adminService: AdminService,
    private driverService: DriverService,
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  onFileSelected(event: any) {
    /*const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileName = target.files[0].name;
    }*/
    this.uploadedImage = event.target.files[0];
  }

  changeProfilePicture() {
    if (this.getRole() === "ROLE_PASSENGER") {
      this.passengerService.changeProfilePicture(this.uploadedImage).subscribe(data => {
        this.passenger = data;
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
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
    else if (this.getRole() === "ROLE_ADMIN") {
      this.adminService.changeProfilePicture(this.uploadedImage).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
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
    else if (this.getRole() === "ROLE_DRIVER") {
      this.driverService.changeProfilePicture(this.uploadedImage).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
          showConfirmButton: false,
          timer: 3000
        })
        this.driverChange.emit(data);
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

  }

  closeModal() {
    this.profilePictureChangeModalClosed.emit();
  }

  getRole() {
    return this.tokenService.getRole();
  }

  getEmail() {
    if (this.getRole() === "ROLE_PASSENGER") {
      return this.passenger.email;
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      return this.admin.email;
    }
    //driver
    else {
      return this.driver.email;
    }
  }

}
