import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { RequestPage } from '../../../shared/models/request-page';
import { RequestPageObject } from '../../../shared/models/request-page-object';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-table-block-users',
  templateUrl: './table-block-users.component.html',
  styleUrls: ['./table-block-users.component.css']
})
export class TableBlockUsersComponent implements OnInit {

  @ViewChild('paginatorPassenger') paginatorPassenger!: MatPaginator;

  @ViewChild('paginatorDriver') paginatorDriver!: MatPaginator;
  
  @Input() passengerChanged!: PassengerDTO;

  @Input() driverChanged! : DriverDTO;

  @Output() showPassengerInfoButtonPressedEvent = new EventEmitter<PassengerDTO>();

  @Output() showDriverInfoButtonPressedEvent = new EventEmitter<DriverDTO>();

  passengers : PassengerDTO[] = [];
  loadingPassengers: boolean = true;
  totalElementsPassengers: number | undefined;
  dataSourcePassengers = new MatTableDataSource<PassengerDTO>();
  displayedColumnsPassengers: string[] = ['fullName', 'rolePassenger', 'blockedStatus'];

  drivers : DriverDTO[] = [];
  loadingDrivers: boolean = true;
  totalElementsloadingDrivers: number | undefined;
  dataSourceDrivers = new MatTableDataSource<DriverDTO>();
  displayedColumnsDrivers: string[] = ['fullName', 'roleDriver', 'blockedStatus'];

  constructor(
    private adminService : AdminService,
  ) { }

  ngOnInit(): void {
    const request: RequestPage = {
      page: 0,
      size: 2
    }
    this.getPassengers(request);
    this.getDrivers(request);
  }

  ngOnChanges(changes: SimpleChanges) {
    const request: RequestPage = {
      page: 0,
      size: 2
    }
    if (changes['passengerChanged'] !== undefined) {
      this.getPassengers(request);
    }
    else {
      this.getDrivers(request);
    }
  }

  private getPassengers(request: RequestPage) {
    this.adminService.getAllPassengers(request).subscribe(data => {
      this.setPassengers(data);
    });
  }

  private getDrivers(request: RequestPage) {
    this.adminService.getAllDrivers(request).subscribe(data => {
      this.setDrivers(data);
    });
  }

  private setPassengers(data: RequestPageObject) {
    this.loadingPassengers = false;
    this.passengers = data.passengers;
    this.passengers.length = data.totalItems;

    this.dataSourcePassengers = new MatTableDataSource<PassengerDTO>(this.passengers);
    this.dataSourcePassengers.paginator = this.paginatorPassenger;
  }

  private setDrivers(data: RequestPageObject) {
    this.loadingDrivers = false;
    this.drivers = data.drivers;
    this.drivers.length = data.totalItems;

    this.dataSourceDrivers = new MatTableDataSource<DriverDTO>(this.drivers);
    this.dataSourceDrivers.paginator = this.paginatorDriver;
  }

  private setNextPassengers(data: RequestPageObject, request: RequestPage) {
    this.loadingPassengers = false;
    this.passengers.length = request.page * request.size;
    this.passengers.push(...data.passengers);
    this.passengers.length = data.totalItems;

    this.dataSourcePassengers = new MatTableDataSource<PassengerDTO>(this.passengers);
    this.dataSourcePassengers._updateChangeSubscription();
    this.dataSourcePassengers.paginator = this.paginatorPassenger;
  }

  private setNextDrivers(data: RequestPageObject, request: RequestPage) {
    this.loadingDrivers = false;
    this.drivers.length = request.page * request.size;
    this.drivers.push(...data.drivers);
    this.drivers.length = data.totalItems;

    this.dataSourceDrivers = new MatTableDataSource<DriverDTO>(this.drivers);
    this.dataSourceDrivers._updateChangeSubscription();
    this.dataSourceDrivers.paginator = this.paginatorDriver;
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

  public nextPagePassengers(event: PageEvent) {
    const request: RequestPage = {
      page: event.pageIndex,
      size: event.pageSize
    }
    this.getNextPassengers(request);
  }

  public nextPageDrivers(event: PageEvent) {
    const request: RequestPage = {
      page: event.pageIndex,
      size: event.pageSize
    }
    this.getNextDrivers(request);
  }

  public showPassengerInfoModal(passenger : PassengerDTO){
    this.showPassengerInfoButtonPressedEvent.emit(passenger);
  }

  public showDriverInfoModal(driver : DriverDTO) {
    this.showDriverInfoButtonPressedEvent.emit(driver);
  }

}
