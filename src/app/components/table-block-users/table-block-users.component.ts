import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { UserIdDTO } from 'src/app/models/user-id-dto';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-block-users',
  templateUrl: './table-block-users.component.html',
  styleUrls: ['./table-block-users.component.css']
})
export class TableBlockUsersComponent implements OnInit {

  @Output() showPassengerInfoButtonPressedEvent = new EventEmitter<PassengerDTO>();

  @Output() showDriverInfoButtonPressedEvent = new EventEmitter<DriverDTO>();

  passengers! : PassengerDTO[];
  drivers! : DriverDTO[];

  constructor(
    private adminService : AdminService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.adminService.getAllDrivers().subscribe(data => {
      this.drivers = data;
    })
    this.adminService.getAllPassengers().subscribe(data => {
      this.passengers = data;
    })
  }

  showPassengerInfoModal(passenger : PassengerDTO){
    this.showPassengerInfoButtonPressedEvent.emit(passenger);
  }

  showDriverInfoModal(driver : DriverDTO) {
    this.showDriverInfoButtonPressedEvent.emit(driver);
  }

}
