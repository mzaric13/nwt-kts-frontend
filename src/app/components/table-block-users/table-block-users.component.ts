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
      console.log(data);
    })
    this.adminService.getAllPassengers().subscribe(data => {
      this.passengers = data;
    })
  }

  changeBlockedStatusPassenger(id : number) {
    let userIdDTO : UserIdDTO = {
      id : id
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
      this.reloadPage();
    })
  }

  changeBlockedStatusDriver(id : number) {
    let userIdDTO : UserIdDTO = {
      id : id
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
      this.reloadPage();
    })
  }

  showPassengerInfoModal(passenger : PassengerDTO){
    this.showPassengerInfoButtonPressedEvent.emit(passenger);
  }

  showDriverInfoModal(driver : DriverDTO) {
    this.showDriverInfoButtonPressedEvent.emit(driver);
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/change-blocked-status']);
  }

}
