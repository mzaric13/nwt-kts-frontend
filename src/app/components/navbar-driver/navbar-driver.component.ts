import { Component, OnInit } from '@angular/core';
import {
  faUser,
  faRoute,
  faArrowRightFromBracket,
  faChartSimple
} from '@fortawesome/free-solid-svg-icons';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';

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

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.driverService.getLoggedDriver().subscribe({
      next: (driver: DriverDTO) => {
        console.log(driver);
        if (driver.available) {
          this.available = "../../../assets/available.png";
        } else {
          this.available = "../../../assets/notavailable.png";
        }
      }
    })
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
