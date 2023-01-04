import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-profile-page-card]',
  templateUrl: './profile-page-card.component.html',
  styleUrls: ['./profile-page-card.component.css']
})
export class ProfilePageCardComponent implements OnInit {

  @Input() type = 'info';

  @Output() newItemEvent = new EventEmitter();

  imgSrc = '';

  title = '';

  description = '';

  buttonText = '';

  constructor(
  ) {}

  ngOnInit(): void {
    if (this.type === 'info') {
      this.imgSrc = '../../../assets/information_icon.png';
      this.title = 'View and edit personal information';
      this.description = 'Press here to view and edit your personal information: name, surname, city and phone number.';
      this.buttonText = 'View and edit info';
    }
    else if (this.type === 'profile-picture') {
      this.imgSrc = '../../../assets/profile_picture_icon.png';
      this.title = 'Change your profile picture';
      this.description = 'Press here to change your profile picture which will be seen by drivers.';
      this.buttonText = 'Change picture';
    }
    else if (this.type === 'password') {
      this.imgSrc = '../../../assets/padlock.png';
      this.title = 'Change your password';
      this.description = 'Press here to change your password. You will be asked to confirm your new password by retyping it.';
      this.buttonText = 'Change password';
    }
    else if (this.type === 'tokens') {
      this.imgSrc = '../../../assets/money.png';
      this.title = 'Buy more TaxiTokens';
      this.description = 'Press here to select the amount of TaxiTokens you want to buy. TaxiTokens are used as a currency for taking ubers.';
      this.buttonText = 'Buy TaxiTokens';
    }
  }

  buttonClicked() {
    this.newItemEvent.emit();
  }

}
