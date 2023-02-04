import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { RequestPage } from '../../../shared/models/request-page';
import { RequestPageObject } from '../../../shared/models/request-page-object';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-page-chat-list',
  templateUrl: './page-chat-list.component.html',
  styleUrls: ['./page-chat-list.component.css']
})
export class PageChatListComponent implements OnInit {

  passengers: PassengerDTO[] = [];
  totalElementsPassengers: number = 0;
  passengerHeaderName = "Passenger"

  drivers : DriverDTO[] = [];
  totalElementsDrivers: number = 0;
  driverHeaderName = "Driver"

  constructor(
    private readonly adminService: AdminService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    const request: RequestPage = {
      page: 0,
      size: 2
    }
    this.getPassengers(request);
    this.getDrivers(request);
  }

  private getPassengers(request: RequestPage) {
    this.adminService.getAllActivePassengers(request).subscribe(data => {
      this.setPassengers(data);
    });
  }

  private getDrivers(request: RequestPage) {
    this.adminService.getAllDrivers(request).subscribe(data => {
      this.setDrivers(data);
    });
  }

  private setPassengers(data: RequestPageObject) {
    this.passengers = data.passengers;
    this.totalElementsPassengers = data.totalItems;
  }

  private setDrivers(data: RequestPageObject) {
    this.drivers = data.drivers;
    this.totalElementsDrivers = data.totalItems;
  }

  private setNextPassengers(data: RequestPageObject, request: RequestPage) {
    let passengers: PassengerDTO[] = [...this.passengers];
    passengers.length = request.page * request.size;
    passengers.push(...data.passengers);
    this.passengers = passengers;
    this.totalElementsPassengers = data.totalItems;
  }

  private setNextDrivers(data: RequestPageObject, request: RequestPage) {
    let drivers: DriverDTO[] = [...this.drivers];
    drivers.length = request.page * request.size;
    drivers.push(...data.drivers);
    this.drivers = drivers;
    this.totalElementsDrivers = data.totalItems;
  }

  private getNextPassengers(request: RequestPage) {
    this.adminService.getAllPassengers(request).subscribe(data => {
      this.setNextPassengers(data, request);
    });
  }

  private getNextDrivers(request: RequestPage) {
    this.adminService.getAllDrivers(request).subscribe(data => {
      this.setNextDrivers(data, request);
    });
  }

  public nextPagePassengers(request: RequestPage) {
    this.getNextPassengers(request);
  }

  public nextPageDrivers(request: RequestPage) {
    this.getNextDrivers(request);
  }

  goToChatPassengers(passengerDTO: PassengerDTO) {
    this.router.navigate(['/user/chat/' + passengerDTO.email]);
  }

  goToChatDrivers(driverDTO: DriverDTO) {
    this.router.navigate(['/user/chat/' + driverDTO.email]);
  }

}
