import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DriveDTO } from 'src/app/models/drive-dto';
import { RequestPage } from 'src/app/models/request-page';
import { DriveService } from 'src/app/services/drive.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TokenService } from 'src/app/services/token.service';
import { RequestPageObject } from 'src/app/models/request-page-object';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RatingService } from 'src/app/services/rating.service';
import { PassengerRatingDTO } from 'src/app/models/passenger-rating-dto';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})

export class ViewHistoryComponent implements OnInit{

  passengerCanRateDrive = new Array<PassengerRatingDTO>();
  drives: DriveDTO[] = [];
  loggedPerson!: string;
  loading: boolean = true;
  totalElements: number | undefined;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'route', 'price', 'startDate', 'endDate', 'participants', 'map', 'rating'];
  displayedColumnsNoRating: string[] = ['id', 'route', 'price', 'startDate', 'endDate', 'participants', 'map'];

  constructor(private driveService: DriveService, private tokenService: TokenService, private ratingService: RatingService, private router: Router) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() showMoreDetailsButtonPressedEvent = new EventEmitter<DriveDTO>();
  @Output() showMapButtonPressedEvent = new EventEmitter<DriveDTO>();
  @Output() showRatingModalPressedEvent = new EventEmitter<DriveDTO>();

  ngOnInit(): void {
    this.getLoggedPerson();
    const request: RequestPage = {
      //izmeniti size
      page: 0,
      size: 2
    }
    if (this.loggedPerson === "passenger") {
      this.getEligibleRatings();
    }
    this.getDrivesByLoggedPerson(request);
  }

  private getEligibleRatings() {
    this.ratingService.findPassengersEligibleRatings().subscribe(data => {
      this.passengerCanRateDrive = data;
    });
  }

  private getDrivesByLoggedPerson(request: RequestPage) {
    if (this.loggedPerson === "admin")
    {
      this.getDrives(request);
    }
    else if (this.loggedPerson === "driver")
    {
      this.getDriverDrives(request);
    }
    //passenger
    else
    {
      this.getPassengerDrives(request);
    }
  }

  private getLoggedPerson() {
    if (this.tokenService.getRole() === "ROLE_ADMIN")
    {
      this.loggedPerson = "admin";
    }
    else if (this.tokenService.getRole() === "ROLE_DRIVER")
    {
      this.loggedPerson = "driver";
    }
    //passenger
    else
    {
      this.loggedPerson = "passenger";
    }
  }

  private setDrives(data: RequestPageObject) {
    this.loading = false;
    this.drives = data.drives;
    this.drives.length = data.totalItems;

    this.dataSource = new MatTableDataSource<any>(this.drives);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getDrives(request: RequestPage) {
    this.driveService.getDrives(request).subscribe(data => {
      this.checkDrivesLength(data);
      this.setDrives(data);
    });
  }

  private getDriverDrives(request: RequestPage) {
    this.driveService.getDrivesForDriver(request).subscribe(data => {
      this.checkDrivesLength(data);
      this.setDrives(data);
    });
  }

  private getPassengerDrives(request: RequestPage) {
    this.driveService.getDrivesForPassenger(request).subscribe(data => {
      this.checkDrivesLength(data);
      this.setDrives(data);
    });
  }

  private setNextDrives(data: RequestPageObject, request: RequestPage) {
    this.loading = false;
    this.drives.length = request.page * request.size;
    this.drives.push(...data.drives);
    this.drives.length = data.totalItems;

    this.dataSource = new MatTableDataSource<any>(this.drives);
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getNextDataAllDrives(request: RequestPage) {
    this.driveService.getDrives(request).subscribe(data => {
      this.setNextDrives(data, request);
    });
  }

  private getNextDataPassengerDrives(request: RequestPage) {
    this.driveService.getDrivesForPassenger(request).subscribe(data => {
      this.setNextDrives(data, request);
    });
  }

  private getNextDataDriverDrives(request: RequestPage) {
    this.driveService.getDrivesForDriver(request).subscribe(data => {
      this.setNextDrives(data, request);
    });
  }

  private checkDrivesLength(data: RequestPageObject) {
    if (data.drives.length === 0) {
      Swal.fire({
        icon: 'info',
        position: 'center',
        title: 'You have not attended any drives yet.',
        showConfirmButton: false,
        timer: 3000
      });
      this.reloadPage();
    }
  }

  private reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.navigateToUser();
  }

  private navigateToUser() {
    if (this.loggedPerson === "admin") {
      this.router.navigate(['/admin-profile']);
    }
    else if (this.loggedPerson === "driver") {
      this.router.navigate(['/driver-profile']);
    }
    else {
      this.router.navigate(['/passenger-profile']);
    }
  }


  public nextPage(event: PageEvent) {
    const request: RequestPage = {
      page: event.pageIndex,
      size: event.pageSize
    }
    if (this.tokenService.getRole() === "ROLE_ADMIN")
    {
      this.getNextDataAllDrives(request);
    }
    else if (this.tokenService.getRole() === "ROLE_DRIVER")
    {
      this.getNextDataDriverDrives(request);
    }
    //passenger
    else {
      this.getNextDataPassengerDrives(request);
    }
  }

  public showDetails(drive: DriveDTO) {
    this.showMoreDetailsButtonPressedEvent.emit(drive);
  }

  public showMap(drive: DriveDTO) {
    this.showMapButtonPressedEvent.emit(drive);
  }

  public giveRating(drive: DriveDTO) {
    this.showRatingModalPressedEvent.emit(drive);
  }

  public passengerCanRate(drive: DriveDTO) {
    for (let p of this.passengerCanRateDrive) {
      if (p.driveId === drive.id) {
        return p.canRate;
      }
    }
    return false;
  }

}
