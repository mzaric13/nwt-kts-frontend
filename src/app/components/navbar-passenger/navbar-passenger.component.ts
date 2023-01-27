import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faBell,
  faArrowRightFromBracket,
  faRoute,
  faChartSimple,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';
import { DriveDTO } from 'src/app/models/drive-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar-passenger',
  templateUrl: './navbar-passenger.component.html',
  styleUrls: ['./navbar-passenger.component.css'],
})
export class NavbarPassengerComponent implements OnInit {
  faUser = faUser;
  faChat = faFacebookMessenger;
  faBell = faBell;
  faLogout = faArrowRightFromBracket;
  faRoute = faRoute;
  faChartSimple = faChartSimple;
  faHome = faHome;

  socket!: WebSocket;
  stompClient!: Stomp.Client;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
  }
  
  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:9000/secured/map');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/secured/update/newDrive', (message: { body: string }) => {
      let drive: DriveDTO = JSON.parse(message.body);
      Swal.fire({
        icon: 'info',
        title: 'Your drive is starting soon!',
        text: drive.route.routeName,
        timer: 2000,
      }).then(() => {
        this.router.navigate(['/drive-simulation/' + drive.id]);
      })
    });
  }
}
