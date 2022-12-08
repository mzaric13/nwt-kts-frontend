import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PasswordChangeCreationDTO } from 'src/app/models/password-change-creation-dto';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-password-change',
  templateUrl: './modal-password-change.component.html',
  styleUrls: ['./modal-password-change.component.css']
})
export class ModalPasswordChangeComponent implements OnInit {

  @Input() passenger!: PassengerDTO;

  @Output() passwordChangeModalClosed = new EventEmitter();

  newPassword!: string;
  newPasswordConfirmation!: string;

  displayStyle = "none";

  constructor(
    private passengerService: PassengerService
  ) { }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  updatePassword() {
    let passwordChangeCreationDto : PasswordChangeCreationDTO = {
      email : this.passenger.email,
      newPassword : this.newPassword,
      newPasswordConfirmation : this.newPasswordConfirmation
    }
    this.passengerService.updatePassword(passwordChangeCreationDto).subscribe(data => {
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
    })
  }

  closeModal() {
    this.passwordChangeModalClosed.emit();
  }

}
