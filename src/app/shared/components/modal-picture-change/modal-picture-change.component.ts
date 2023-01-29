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

  displayStyle = "none";

  fileName =  '';

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

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileName = target.files[0].name;
    }
  }

  changeProfilePicture() {
    if(this.fileName.length === 0) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'No picture was found.',
        showConfirmButton: false,
        timer: 3000
      })
    }
    else{
      let profilePictureCreationDTO : ProfilePictureCreationDTO = {
        email : this.getEmail(),
        profilePicturePath : this.fileName
      }
      if (this.getRole() === "ROLE_PASSENGER") {
        this.passengerService.changeProfilePicture(profilePictureCreationDTO).subscribe(data => {
          this.passenger.profilePicture = this.fileName;
          Swal.fire({
            icon: 'success',
            position: 'center',
            title:  data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
            showConfirmButton: false,
            timer: 3000
          })
          this.passengerChange.emit(data);
          this.closeModal();
        },
        error =>{
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
        this.adminService.changeProfilePicture(profilePictureCreationDTO).subscribe(data => {
          this.admin.profilePicture = this.fileName;
          Swal.fire({
            icon: 'success',
            position: 'center',
            title:  data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
            showConfirmButton: false,
            timer: 3000
          })
          this.adminChange.emit(data);
          this.closeModal();
        },
        error =>{
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
        this.driverService.changeProfilePicture(profilePictureCreationDTO).subscribe(data => {
          this.driver.profilePicture = this.fileName;
          Swal.fire({
            icon: 'success',
            position: 'center',
            title:  data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
            showConfirmButton: false,
            timer: 3000
          })
          this.driverChange.emit(data);
          this.closeModal();
        },
        error =>{
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
