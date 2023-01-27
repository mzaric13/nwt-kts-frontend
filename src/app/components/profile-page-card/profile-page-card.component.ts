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
      this.setValues('../../../assets/information_icon.png', 'View and edit personal information',
       'Press here to view and edit your personal information: name, surname, city and phone number.','View and edit info');
    }
    else if (this.type === 'profile-picture') {
      this.setValues('../../../assets/profile_picture_icon.png', 'Change your profile picture',
      'Press here to change your profile picture which will be seen by drivers.', 'Change picture');
    }
    else if (this.type === 'password') {
      this.setValues('../../../assets/padlock.png', 'Change your password', 
      'Press here to change your password. You will be asked to confirm your new password by retyping it.', 'Change password');
    }
    else if (this.type === 'tokens') {
      this.setValues('../../../assets/money.png', 'Buy more TaxiTokens',
      'Press here to select the amount of TaxiTokens you want to buy. TaxiTokens are used as a currency for taking ubers.', 'Buy TaxiTokens');
    }
  }

  setValues(imgSrc: string, title: string, description: string, buttonText: string) {
    this.imgSrc = imgSrc;
    this.title = title;
    this.description = description;
    this.buttonText = buttonText;
  }

  buttonClicked() {
    this.newItemEvent.emit();
  }

}
