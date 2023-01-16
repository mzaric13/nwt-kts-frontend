import { Component, OnInit } from '@angular/core';
import { DriveDTO } from 'src/app/models/drive-dto';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-view-drive-history',
  templateUrl: './page-view-drive-history.component.html',
  styleUrls: ['./page-view-drive-history.component.css']
})
export class PageViewDriveHistoryComponent implements OnInit {

  drive!: DriveDTO;
  modalIsOpened = false;
  mapModalIsOpened = false;
  loggedPerson!: string;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getRole() === "ROLE_ADMIN")
    {
      this.loggedPerson = "admin";
    }
    else if (this.tokenService.getRole() === "ROLE_PASSENGER")
    {
      this.loggedPerson = "passenger";
    }
    //driver
    else
    {
      this.loggedPerson = "driver";
    }
  }

  public showModal(drive: DriveDTO) {
    this.drive = drive;
    this.modalIsOpened = true;
  }

  public closeModal() {
    this.modalIsOpened = false;
  }

  public showMapModal(drive: DriveDTO) {
    this.drive = drive;
    this.mapModalIsOpened = true;
  }

  public closeMapModal() {
    this.mapModalIsOpened = false;
  }
}
