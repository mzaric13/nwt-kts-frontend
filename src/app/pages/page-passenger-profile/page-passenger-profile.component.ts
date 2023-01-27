import { Component, Input, OnInit } from '@angular/core';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-page-passenger-profile',
  templateUrl: './page-passenger-profile.component.html',
  styleUrls: ['./page-passenger-profile.component.css']
})
export class PagePassengerProfileComponent implements OnInit  {

  @Input() loggedPassenger!: PassengerDTO;

  isLoaded = false;

  personalInfo = false;
  passwordChange = false;
  profilePictureChange = false;

  constructor(private passengerService: PassengerService) { }
  
  ngOnInit() : void {
    try {
      this.passengerService.getLoggedPassenger().subscribe(
        (res : PassengerDTO) => {
          this.loggedPassenger = res;
          this.isLoaded = true;
        },
        err => {
          console.log(err);
        }
      );
    }catch (e){
      console.log(e);
    }
  }


  openModal(type: string) : void {
    if (type === "personalInfo" && this.isLoaded) {
      this.personalInfo = true;
    }
    else if (type === "changePassword" && this.isLoaded) {
      this.passwordChange = true;
    }
    else if (type === "profilePicture" && this.isLoaded) {
      this.profilePictureChange = true;
    }
  }

  closeModal() : void {
    if (this.personalInfo === true) {
      this.personalInfo = false;
    }
    else if (this.passwordChange === true) {
      this.passwordChange = false;
    }
    else if (this.profilePictureChange === true) {
      this.profilePictureChange = false;
    }
  }

  changePassenger(passengerDTO: PassengerDTO) {
    this.loggedPassenger = passengerDTO;
  } 

  

}
