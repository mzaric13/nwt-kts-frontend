import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminDTO } from 'src/app/models/admin-dto';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: '[app-profile-page-cards]',
  templateUrl: './profile-page-cards.component.html',
  styleUrls: ['./profile-page-cards.component.css']
})
export class ProfilePageCardsComponent implements OnInit {

  tokenService: TokenService = new TokenService;

  @Input() passenger!: PassengerDTO;

  @Input() admin!: AdminDTO;

  @Output() modalEvent = new EventEmitter<string>();

  name = 'Name Surname';

  imgSrc = '../../../assets/default.jpg';

  constructor(
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getRole() === "ROLE_PASSENGER") {
      this.name = this.passenger.name + ' ' + this.passenger.surname;
      if (this.passenger.profilePicture !== null) this.imgSrc = '../../../assets/' + this.passenger.profilePicture;
    }
    else if (this.tokenService.getRole() === "ROLE_ADMIN") {
      this.name = this.admin.name + ' ' + this.admin.surname;
      if (this.admin.profilePicture !== null) this.imgSrc = '../../../assets/' + this.admin.profilePicture;
    }
    //else if driver
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
    this.modalEvent.emit("tokens");
  }
}
