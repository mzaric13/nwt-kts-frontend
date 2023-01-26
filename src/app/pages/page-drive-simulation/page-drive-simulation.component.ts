import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DriveDTO } from 'src/app/models/drive-dto';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { DriveService } from 'src/app/services/drive.service';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import Swal from 'sweetalert2';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-page-drive-simulation',
  templateUrl: './page-drive-simulation.component.html',
  styleUrls: ['./page-drive-simulation.component.css']
})
export class PageDriveSimulationComponent implements OnInit {

  loggedPassenger!: PassengerDTO;

  loggedDriver!: DriverDTO;

  drive!: DriveDTO;

  socket!: WebSocket;
  stompClient!: Stomp.Client;

  giveRating: boolean = false;

  constructor(
    private readonly passengerService: PassengerService,
    private readonly driverService: DriverService,
    private readonly driveService: DriveService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

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
    this.stompClient.subscribe('/secured/update/drive-inconsistency', (message: { body: string }) => {
      this.drive = JSON.parse(message.body);
    });

    this.stompClient.subscribe('/secured/update/end-drive', (message: { body: string }) => {
      this.drive = JSON.parse(message.body);
      this.giveRating = true;
    })
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
        this.route.navigate(['/driver-profile'], {replaceUrl: true});
      }
    })
  }

  redirectPassenger() {
    this.route.navigate(['/home-passenger'], {replaceUrl: true});
  }

}
