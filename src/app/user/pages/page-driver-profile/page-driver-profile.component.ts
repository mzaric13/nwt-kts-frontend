import { Component, Input, OnInit } from '@angular/core';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { DriverService } from '../../../shared/services/driver.service';

@Component({
  selector: 'app-page-driver-profile',
  templateUrl: './page-driver-profile.component.html',
  styleUrls: ['./page-driver-profile.component.css']
})
export class PageDriverProfileComponent implements OnInit {

  @Input() loggedDriver!: DriverDTO;

  isLoaded = false;

  personalInfo = false;
  passwordChange = false;
  profilePictureChange = false;

  constructor(private driverService: DriverService) { }
  
  ngOnInit() : void {
    try {
      this.driverService.getLoggedDriver().subscribe(
        (res : DriverDTO) => {
          this.loggedDriver = res;
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

  changeDriver(driverDTO: DriverDTO) {
    this.loggedDriver = driverDTO;
  }

}
