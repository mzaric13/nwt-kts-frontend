import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faRoute,
  faArrowRightFromBracket,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { DriverService } from '../../../shared/services/driver.service';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';
import { DriveDTO } from '../../../shared/models/drive-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OauthService } from 'src/app/auth/services/oauth.service';

@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.css']
})
export class NavbarDriverComponent implements OnInit {

  available = "../../../../assets/available.png";
  faUser = faUser;
  faRoute = faRoute;
  faLogout = faArrowRightFromBracket;
  faChartSimple = faChartSimple;
  faChat = faFacebookMessenger;
  hasDrive: boolean = false;
  statusChange: boolean = false;


  socket!: WebSocket;
  stompClient!: Stomp.Client;

  loggedDriver!: DriverDTO;

  constructor(
    private driverService: DriverService,
    private router: Router,
    private oauthService: OauthService
  ) { }

  ngOnInit(): void {
    this.driverService.getLoggedDriver().subscribe({
      next: (driver: DriverDTO) => {
        this.loggedDriver = driver;
        if (driver.available) {
          this.available = "../../../../assets/available.png";
        } else {
          this.available = "../../../../assets/notavailable.png";
        }
      }
    });

    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:9000/secured/driver');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/secured/update/driverStatus', (message: { body: string }) => {
      let driver: DriverDTO = JSON.parse(message.body);
      if (this.hasDrive) {
        if (this.statusChange) this.hasDrive = false;
        else this.statusChange = true;
      }
      if (driver.available) {
        this.available = "../../../../assets/available.png";
      } else {
        this.available = "../../../../assets/notavailable.png";
      }
    });

    this.stompClient.subscribe('/secured/update/newDrive', (message: { body: string }) => {
      let drive: DriveDTO = JSON.parse(message.body);
      if (drive.driver.id === this.loggedDriver.id) {
        this.hasDrive = true;
        this.statusChange = false;
        Swal.fire({
          icon: 'info',
          title: 'There is a new drive for you!',
          text: drive.route.routeName,
          timer: 2000,
        }).then(() => {
          this.router.navigate(['/user/drive-simulation/' + drive.id]);
        });
      }
    });
  }

  public changeStatus() {
    if (this.hasDrive) return;
    this.driverService.changeStatus().subscribe(data => {
      if (data.available) {
        this.available = "../../../../assets/available.png";
      }
      else {
        this.available = "../../../../assets/notavailable.png";
      }
    })
  }

  logout() {
    this.oauthService.logout().subscribe({
      next: (message: string) => {
        this.router.navigate(['/']);
      }
    })
  }

}
