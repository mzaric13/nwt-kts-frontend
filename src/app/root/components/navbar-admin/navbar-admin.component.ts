import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faRoute,
  faUserLock,
  faIdCard,
  faUserPlus,
  faArrowRightFromBracket,
  faChartSimple,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  faUser = faUser;
  faRoute = faRoute;
  faUserLock = faUserLock;
  faIdCard = faIdCard;
  faUserPlus = faUserPlus;
  faLogout = faArrowRightFromBracket;
  faChartSimple = faChartSimple;
  faChat = faFacebookMessenger;
  constructor() { }

  ngOnInit(): void {
  }

}
