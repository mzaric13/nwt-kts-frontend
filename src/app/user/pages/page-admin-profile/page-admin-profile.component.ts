import { Component, Input, OnInit } from '@angular/core';
import { AdminDTO } from '../../../shared/models/admin-dto';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-page-admin-profile',
  templateUrl: './page-admin-profile.component.html',
  styleUrls: ['./page-admin-profile.component.css']
})
export class PageAdminProfileComponent implements OnInit {

  @Input() loggedAdmin!: AdminDTO;

  isLoaded = false;

  personalInfo = false;
  passwordChange = false;
  profilePictureChange = false;

  constructor(private adminService: AdminService) { }
  
  ngOnInit() : void {
    try {
      this.adminService.getLoggedAdministrator().subscribe(
        (res : AdminDTO) => {
          this.loggedAdmin = res;
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

  changeAdmin(adminDTO: AdminDTO) {
    this.loggedAdmin = adminDTO;
  }

}
