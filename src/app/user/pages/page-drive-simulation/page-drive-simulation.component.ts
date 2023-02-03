import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveDTO } from '../../../shared/models/drive-dto';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { DriveService } from '../../../shared/services/drive.service';
import { DriverService } from '../../../shared/services/driver.service';
import { PassengerService } from '../../../shared/services/passenger.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Swal from 'sweetalert2';
import { Status } from '../../../shared/models/status';
import { GeocodeService } from '../../../shared/services/geocode.service';
import { interval, Subscription } from 'rxjs';
import { DeclineDriveDTO } from '../../../shared/models/decline-drive-dto';
import { PointDTO } from 'src/app/shared/models/point-dto';
import { RouteApiDTO } from 'src/app/shared/models/route-api-dto';

@Component({
  selector: 'app-page-drive-simulation',
  templateUrl: './page-drive-simulation.component.html',
  styleUrls: ['./page-drive-simulation.component.css']
})
export class PageDriveSimulationComponent implements OnInit, OnDestroy {

  loggedPassenger!: PassengerDTO;

  loggedDriver!: DriverDTO;

  drive!: DriveDTO;
  routes!: RouteApiDTO;

  socket!: WebSocket;
  stompClient!: Stomp.Client;

  giveRating: boolean = false;

  estimatedTime: number = 0;

  routeEstimatedTime: number = 0;

  subscription!: Subscription;
  source = interval(60000);

  statusIsDrivingToStart: boolean = false;
  statusIsDriveStarted: boolean = false;

  driverPosition!: PointDTO;

  constructor(
    private readonly passengerService: PassengerService,
    private readonly driverService: DriverService,
    private readonly driveService: DriveService,
    private readonly geocodeService: GeocodeService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.passengerService.getLoggedPassenger().subscribe({
      next: (passenger: PassengerDTO) => {
        this.loggedPassenger = passenger;
      }
    });

    this.driverService.getLoggedDriver().subscribe({
      next: (driver: DriverDTO) => {
        this.loggedDriver = driver;
      }
    });

    this.activatedRoute.params.subscribe({
      next: params => {
        this.driveService.getDrive(params['id']).subscribe({
          next: (drive: DriveDTO) => {
            this.drive = drive;
            this.updateStatuses();
            console.log(drive.status);
            console.log(this.statusIsDrivingToStart);
            this.geocodeService.getRoutes([this.drive.driver.location, this.drive.route.waypoints[0]]).subscribe({
              next: (response) => {
                const routes: RouteApiDTO = response as RouteApiDTO;
                this.estimatedTime = Math.round(routes.routes[0].duration / 60);
                const source = interval(28000);
                this.subscription = source.subscribe(val => this.changeDuration());
              }
            });
            this.geocodeService.getRoutes(drive.route.waypoints).subscribe({
              next: (response) => {
                const routes: RouteApiDTO = response as RouteApiDTO;
                this.routes = routes;
              }
            });
          }
        });
      }
    });

    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:9000/secured/drive');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/secured/update/driveStatus', (message: { body: string }) => {
      this.drive = JSON.parse(message.body);
      this.updateStatuses();
      if (this.statusIsDriveStarted) {
        this.estimatedTime = this.routeEstimatedTime;
      }
      if (this.drive.status.toString() === Status[Status.CANCELLED]) {
        if (this.loggedPassenger) {
          Swal.fire({
            icon: 'info',
            title: 'Drive cancelled!',
            text: 'We are sorry to inform you, but your driver has cancelled!',
            timer: 3000,
          })
            .then(() => {
              this.route.navigate(['/user/home-passenger'], { replaceUrl: true });
          });
        } else {
          this.route.navigate(['/user/driver-profile'], { replaceUrl: true });
        }
      }
    });

    this.stompClient.subscribe('/secured/update/drive-inconsistency', (message: { body: string }) => {
      this.drive = JSON.parse(message.body);
    });

    this.stompClient.subscribe('/secured/update/end-drive', (message: { body: string }) => {
      this.drive = JSON.parse(message.body);
      this.updateStatuses();
      this.giveRating = true;
    });

    this.stompClient.subscribe('/secured/simulation/update-vehicle-position', (message: {body: string}) => {
      let driver: DriverDTO = JSON.parse(message.body);
      this.driverPosition = driver.location;
    });
  }

  reportInconsistency(driveInconsistency: string) {
    this.drive.inconsistentDriveReasoning.push(driveInconsistency);
    this.driveService.reportInconsistency(this.drive).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Inconsistency reported successfully"
        })
      }
    });
  }

  endDrive() {
    this.drive.status = Status.FINISHED;
    this.driveService.endDrive(this.drive).subscribe({
      next: () => {
        this.route.navigate(['/user/driver-profile'], {replaceUrl: true});
      }
    })
  }

  redirectPassenger() {
    this.route.navigate(['/user/home-passenger'], {replaceUrl: true});
  }

  getRouteDuration(duration: number) {
    this.routeEstimatedTime = duration;
  }

  changeDuration() {
    if (this.estimatedTime > 0) this.estimatedTime--;
  }

  startDrive() {
    this.driveService.startDrive(this.drive).subscribe({
      next: () => {
      }
    })
  }

  cancelDrive(cancelReason: string) {
    const declineDriveDTO: DeclineDriveDTO = {
      driveDTO: this.drive,
      reasonForDeclining: cancelReason,
    }
    this.driveService.declineDrive(declineDriveDTO).subscribe({
      next: () => {
      }
    })
  }

  updateStatuses() {
    this.statusIsDrivingToStart = this.drive.status.toString() === Status[Status.DRIVING_TO_START];
    this.statusIsDriveStarted = this.drive.status.toString() === Status[Status.STARTED];
  }

}
