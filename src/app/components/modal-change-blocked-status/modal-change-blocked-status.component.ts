import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { UserIdDTO } from 'src/app/models/user-id-dto';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-change-blocked-status',
  templateUrl: './modal-change-blocked-status.component.html',
  styleUrls: ['./modal-change-blocked-status.component.css']
})
export class ModalChangeBlockedStatusComponent implements OnInit {

  @Input() passenger!: PassengerDTO | null;
  @Input() driver!: DriverDTO | null;

  @Output() modalIsClosed = new EventEmitter();
  @Output() passengerBlockedStatusChanged = new EventEmitter<PassengerDTO>();
  @Output() driverBlockedStatusChanged = new EventEmitter<DriverDTO>();

  displayStyle = "none";
  reason! : string;

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  changeBlockedStatusPassenger(id : number) {
    let userIdDTO : UserIdDTO = {
      id : id,
      reasoning: this.reason
    }
    if (userIdDTO.reasoning === undefined){
      if (this.passenger?.blocked) {
        userIdDTO.reasoning = "You have been unblocked.";
      }
      else {
        userIdDTO.reasoning = "You have been blocked.";
      }
    }
    this.adminService.changeBlockedStatusPassenger(userIdDTO).subscribe(data => {
      if (data.blocked) {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: 'You have successfully blocked passenger ' + data.name + ' ' + data.surname + '.',
          showConfirmButton: false,
          timer: 3000
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: 'You have sucessfully unblocked passenger ' + data.name + ' ' + data.surname + '.',
          showConfirmButton: false,
          timer: 3000
        })
      }
      this.passengerBlockedStatusChanged.emit(data);
      this.closeModal();
    })
  }

  changeBlockedStatusDriver(id : number) {
    let userIdDTO : UserIdDTO = {
      id : id,
      reasoning: this.reason
    }
    if (userIdDTO.reasoning === undefined){
      if (this.passenger?.blocked) {
        userIdDTO.reasoning = "You have been unblocked.";
      }
      else {
        userIdDTO.reasoning = "You have been blocked.";
      }
    }
    this.adminService.changeBlockedStatusDriver(userIdDTO).subscribe(data => {
      if (data.blocked) {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: 'You have successfully blocked driver ' + data.name + ' ' + data.surname + '.',
          showConfirmButton: false,
          timer: 3000
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          position: 'center',
          title: 'You have sucessfully unblocked driver ' + data.name + ' ' + data.surname + '.',
          showConfirmButton: false,
          timer: 3000
        })
      }
      this.driverBlockedStatusChanged.emit(data);
      this.closeModal();
    })
  }

  closeModal() {
    this.modalIsClosed.emit();
  }

}
