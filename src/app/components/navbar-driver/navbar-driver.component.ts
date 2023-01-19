import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faUser,
  faRoute,
  faArrowRightFromBracket,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';

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

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
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
