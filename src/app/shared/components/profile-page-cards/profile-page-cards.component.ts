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
    this.createNameAndImageSrc();
  }

  ngOnChanges() {
    this.createNameAndImageSrc();
  }

  createNameAndImageSrc() {
    if (this.tokenService.getRole() === "ROLE_PASSENGER") {
      this.name = this.passenger.name + ' ' + this.passenger.surname;
      if (this.passenger.city === null) this.imgSrc = this.passenger.profilePicture;
      else {
        if (this.passenger.imageData !== undefined && this.passenger.imageData !== null) this.imgSrc = 'data:image/jpeg;base64,' + this.passenger.imageData.imageData;
      }
    }
    else if (this.tokenService.getRole() === "ROLE_ADMIN") {
      this.name = this.admin.name + ' ' + this.admin.surname;
      if (this.admin.imageData !== undefined && this.admin.imageData !== null) this.imgSrc = 'data:image/jpeg;base64,' + this.admin.imageData.imageData;
    }
    else if (this.tokenService.getRole() === "ROLE_DRIVER") {
      this.name = this.driver.name + ' ' + this.driver.surname;
      if (this.driver.imageData !== undefined && this.driver.imageData !== null) this.imgSrc = 'data:image/jpeg;base64,' + this.driver.imageData.imageData;
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
