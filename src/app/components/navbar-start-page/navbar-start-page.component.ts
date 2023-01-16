import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHouse,
  faArrowRightToBracket,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar-start-page',
  templateUrl: './navbar-start-page.component.html',
  styleUrls: ['./navbar-start-page.component.css']
})
export class NavbarStartPageComponent implements OnInit {
  faHouse = faHouse;
  faLogin = faArrowRightToBracket;
  faPersonCirclePlus = faUserPlus;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToRegisterPage(): void {
    const registerPage : string[] = ['/register']
    this.router.navigate(registerPage);
  }
}
