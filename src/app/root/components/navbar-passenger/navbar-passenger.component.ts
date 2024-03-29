import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faArrowRightFromBracket,
  faRoute,
  faChartSimple,
  faHome,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client';
import { DriveDTO } from '../../../shared/models/drive-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { NotificationDTO } from '../../../shared/models/notification-dto';
import { PassengerService } from '../../../shared/services/passenger.service';
import { OauthService } from 'src/app/auth/services/oauth.service';


@Component({
  selector: 'app-navbar-passenger',
  templateUrl: './navbar-passenger.component.html',
  styleUrls: ['./navbar-passenger.component.css'],
})
export class NavbarPassengerComponent implements OnInit {
  faUser = faUser;
  faChat = faFacebookMessenger;
  faLogout = faArrowRightFromBracket;
  faRoute = faRoute;
  faChartSimple = faChartSimple;
  faHome = faHome;
  faCoins = faCoins;

  socket!: WebSocket;
  stompClient!: Stomp.Client;

  loggedPassenger!: PassengerDTO;

  constructor(
    private router: Router,
    private passengerService: PassengerService,
    private oauthService: OauthService
  ) { }

  ngOnInit(): void {
    this.passengerService.getLoggedPassenger().subscribe({
      next: (passenger: PassengerDTO) => {
        this.loggedPassenger = passenger;
      }
    })
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
      drive.passengers.forEach(passenger => {
        if (passenger.id === this.loggedPassenger.id) {
          Swal.fire({
            icon: 'info',
            title: 'Your drive is starting soon!',
            text: drive.route.routeName,
            timer: 2000,
          }).then(() => {
            this.router.navigate(['/user/drive-simulation/' + drive.id]);
          });
        }
      })
    });

    this.stompClient.subscribe('/secured/update/updatePassenger', (message: { body: string }) => {
      const notification: NotificationDTO = JSON.parse(message.body);
      if (this.loggedPassenger.id === notification.passengerId) {
        Swal.fire({
          icon: 'info',
          title: 'Your drive is starting soon!',
          text: notification.notificationMessage,
          timer: 4000,
        });
      }
    });

    this.stompClient.subscribe('/secured/update/tokens', (message: { body: string }) => { 
      let passenger: PassengerDTO = JSON.parse(message.body);
      if (this.loggedPassenger.id === passenger.id) {
        this.loggedPassenger.tokens = passenger.tokens;
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
