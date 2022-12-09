import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() modalEvent = new EventEmitter<string>();

  name = 'Name Surname';

  imgSrc = '../../../assets/default.jpg';

  constructor(
  ) { }

  ngOnInit(): void {
    this.name = this.passenger.name + ' ' + this.passenger.surname;
    if (this.passenger.profilePicture !== null) this.imgSrc = '../../../assets/' + this.passenger.profilePicture;
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
