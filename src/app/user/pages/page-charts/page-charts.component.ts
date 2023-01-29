import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-page-charts',
  templateUrl: './page-charts.component.html',
  styleUrls: ['./page-charts.component.css']
})
export class PageChartsComponent implements OnInit {

  loggedPerson!: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getLoggedPerson();
  }
  

  private getLoggedPerson() {
    if (this.tokenService.getRole() === "ROLE_ADMIN")
    {
      this.loggedPerson = "admin";
    }
    else if (this.tokenService.getRole() === "ROLE_PASSENGER")
    {
      this.loggedPerson = "passenger";
    }
    //driver
    else
    {
      this.loggedPerson = "driver";
    }
  }

}
