import { Component, OnInit, Input } from '@angular/core';
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

  name = 'Name Surname';

  imgSrc = '../../../assets/default.jpg';

  constructor(
  ) { }

  ngOnInit(): void {
    this.name = this.passenger.name + ' ' + this.passenger.surname;
    if (this.passenger.profilePicture !== null) this.imgSrc = this.passenger.profilePicture;
  }

}
