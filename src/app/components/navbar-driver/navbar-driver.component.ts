import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faRoute,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-driver',
  templateUrl: './navbar-driver.component.html',
  styleUrls: ['./navbar-driver.component.css']
})
export class NavbarDriverComponent implements OnInit {
  faUser = faUser;
  faRoute = faRoute;
  faLogout = faArrowRightFromBracket;
  constructor() { }

  ngOnInit(): void {
  }

}
