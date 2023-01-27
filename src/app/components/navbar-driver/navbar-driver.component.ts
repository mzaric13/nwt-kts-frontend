import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faUser,
  faRoute,
  faArrowRightFromBracket,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.css']
})
export class NavbarDriverComponent implements OnInit {

  available = "../../../assets/available.png";
  faUser = faUser;
  faRoute = faRoute;
  faLogout = faArrowRightFromBracket;
  faChartSimple = faChartSimple;
  faChat = faFacebookMessenger;

  socket!: WebSocket;
  stompClient!: Stomp.Client;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService.getLoggedDriver().subscribe({
      next: (driver: DriverDTO) => {
        if (driver.available) {
          this.available = "../../../assets/available.png";
        } else {
          this.available = "../../../assets/notavailable.png";
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
      if (driver.available) {
        this.available = "../../../assets/available.png";
      } else {
        this.available = "../../../assets/notavailable.png";
      }
    });
  }

  public changeStatus() {
    this.driverService.changeStatus().subscribe(data => {
      if (data.available) {
        this.available = "../../../assets/available.png";
      }
      else {
        this.available = "../../../assets/notavailable.png";
      }
    })
  }

}
