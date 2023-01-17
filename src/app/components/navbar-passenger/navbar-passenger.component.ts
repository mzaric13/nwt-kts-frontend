import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faBell,
  faArrowRightFromBracket,
  faRoute,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

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
  constructor() {}

  ngOnInit(): void {}
}
