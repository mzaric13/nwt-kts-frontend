import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminDTO } from 'src/app/models/admin-dto';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PasswordChangeCreationDTO } from 'src/app/models/password-change-creation-dto';
import { AdminService } from 'src/app/services/admin.service';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-password-change',
  templateUrl: './modal-password-change.component.html',
  styleUrls: ['./modal-password-change.component.css']
})
export class ModalPasswordChangeComponent implements OnInit {

  //passenger
  @Input() passenger!: PassengerDTO;

  //admin
  @Input() admin!: AdminDTO;

  //driver
  @Input() driver!: DriverDTO;

  @Output() passwordChangeModalClosed = new EventEmitter();

  newPassword!: string;
  newPasswordConfirmation!: string;

  displayStyle = "none";

  constructor(
    private passengerService: PassengerService,
    private adminService: AdminService,
    private driverService: DriverService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  updatePassword() {
    let passwordChangeCreationDTO : PasswordChangeCreationDTO = {
      email : this.getEmail(),
      newPassword : this.newPassword,
      newPasswordConfirmation : this.newPasswordConfirmation
    }
    if (this.getRole() === "ROLE_PASSENGER"){
      this.passengerService.updatePassword(passwordChangeCreationDTO).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: data.name + ' ' + data.surname + ', you have successfully updated your password.',
          showConfirmButton: false,
          timer: 3000
        })
      }, error => {
        Swal.fire({
          icon: 'error',
          position: 'center',
          title: 'An unknown error has occured.',
          showConfirmButton: false,
          timer: 3000
        })
        this.closeModal();
      })
    }
    else if (this.getRole() === "ROLE_ADMIN") {
      this.adminService.updatePassword(passwordChangeCreationDTO).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: data.name + ' ' + data.surname + ', you have successfully updated your password.',
          showConfirmButton: false,
          timer: 3000
        })
        this.closeModal();
      }, error => {
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
      this.driverService.updatePassword(passwordChangeCreationDTO).subscribe(data => {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: data.name + ' ' + data.surname + ', you have successfully updated your password.',
          showConfirmButton: false,
          timer: 3000
        })
        this.closeModal();
      }, error => {
        Swal.fire({
          icon: 'error',
          position: 'center',
          title: 'An unknown error has occured.',
          showConfirmButton: false,
          timer: 3000
        })
      }
      )
    }

  }

  closeModal() {
    this.passwordChangeModalClosed.emit();
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
