import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDTO } from '../../models/admin-dto';
import { DriverDTO } from '../../models/driver-dto';
import { PassengerDTO } from '../../models/passenger-dto';
import { TokenService } from '../../services/token.service';

@Component({
  selector: '[app-profile-page-cards]',
  templateUrl: './profile-page-cards.component.html',
  styleUrls: ['./profile-page-cards.component.css']
})
export class ProfilePageCardsComponent implements OnInit {

  tokenService: TokenService = new TokenService;

  @Input() passenger!: PassengerDTO;

  @Input() admin!: AdminDTO;

  @Input() driver!: DriverDTO;

  @Output() modalEvent = new EventEmitter<string>();

  name = 'Name Surname';

  imgSrc = '../../../../assets/default.jpg';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getRole() === "ROLE_PASSENGER") {
      this.name = this.passenger.name + ' ' + this.passenger.surname;
      if (this.passenger.city === null) this.imgSrc = this.passenger.profilePicture;
      else {
        if (this.passenger.profilePicture !== null) this.imgSrc = '../../../../assets/' + this.passenger.profilePicture;
      }
    }
    else if (this.tokenService.getRole() === "ROLE_ADMIN") {
      this.name = this.admin.name + ' ' + this.admin.surname;
      if (this.admin.city === null) this.imgSrc = this.admin.profilePicture;
      else {
        if (this.admin.profilePicture !== null) this.imgSrc = '../../../../assets/' + this.admin.profilePicture;
      }
    }
    else if (this.tokenService.getRole() === "ROLE_DRIVER") {
      this.name = this.driver.name + ' ' + this.driver.surname;
      if (this.driver.city === null) this.imgSrc = this.driver.profilePicture;
      else {
        if (this.driver.profilePicture !== null) this.imgSrc = '../../../../assets/' + this.driver.profilePicture;
      }
    }
    else {
      throw new Error("Unauthorized access to the profile!");
    }
  }

  personalInfoClicked() {
    this.modalEvent.emit("personalInfo");
  }

  passwordClicked() {
    this.modalEvent.emit("changePassword");
  }

  profilePictureClicked() {
    this.modalEvent.emit("profilePicture");
  }

  tokensClicked() {
    // router to buy tokens page
    this.router.navigate(['/user/purchase-tokens']);
  }
}