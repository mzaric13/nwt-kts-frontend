import { Component, Input, OnInit } from '@angular/core';
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
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';


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

  socket!: WebSocket;
  stompClient!: Stomp.Client;

  loggedPassenger!: PassengerDTO;

  constructor(
    private router: Router,
    private passengerService: PassengerService,
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
            this.router.navigate(['/drive-simulation/' + drive.id]);
          });
        }
      })
    });
  }
}
