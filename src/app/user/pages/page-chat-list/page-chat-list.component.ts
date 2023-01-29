import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild('paginatorPassenger') paginatorPassenger!: MatPaginator;

  @ViewChild('paginatorDriver') paginatorDriver!: MatPaginator;

  tableData: PassengerDTO[] = [];
  displayedColumns: string[] = ['profile-picture', 'email', 'name', 'surname'];

  passengers : PassengerDTO[] = [];
  loadingPassengers: boolean = true;
  totalElementsPassengers: number | undefined;
  dataSourcePassengers = new MatTableDataSource<PassengerDTO>();

  drivers : DriverDTO[] = [];
  loadingDrivers: boolean = true;
  totalElementsloadingDrivers: number | undefined;
  dataSourceDrivers = new MatTableDataSource<DriverDTO>();

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

    this.dataSourcePassengers = new MatTableDataSource<any>(this.passengers);
    this.dataSourcePassengers._updateChangeSubscription();
    this.dataSourcePassengers.paginator = this.paginatorPassenger;
  }

  private setNextDrivers(data: RequestPageObject, request: RequestPage) {
    this.loadingDrivers = false;
    this.drivers.length = request.page * request.size;
    this.drivers.push(...data.drivers);
    this.drivers.length = data.totalItems;

    this.dataSourceDrivers = new MatTableDataSource<any>(this.drivers);
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

  goToChatPassengers(passengerDTO: PassengerDTO) {
    this.router.navigate(['/user/chat/' + passengerDTO.email]);
  }

  goToChatDrivers(driverDTO: DriverDTO) {
    this.router.navigate(['/user/chat/' + driverDTO.email]);
  }

}
