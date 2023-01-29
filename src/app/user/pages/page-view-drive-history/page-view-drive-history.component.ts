import { Component, OnInit } from '@angular/core';
import { DriveDTO } from '../../../shared/models/drive-dto';
import { PassengerRatingDTO } from '../../../shared/models/passenger-rating-dto';
import { RatingDTO } from '../../../shared/models/rating-dto';
import { RatingService } from '../../../shared/services/rating.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'app-page-view-drive-history',
  templateUrl: './page-view-drive-history.component.html',
  styleUrls: ['./page-view-drive-history.component.css']
})
export class PageViewDriveHistoryComponent implements OnInit {

  drive!: DriveDTO;
  modalIsOpened = false;
  mapModalIsOpened = false;
  ratingModalIsOpened = false;
  loggedPerson!: string;
  passengerCanRateDrive = new Array<PassengerRatingDTO>();

  constructor(private tokenService: TokenService, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.getLoggedPerson();
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

  public showRatingModal(drive: DriveDTO) {
    this.drive = drive;
    this.ratingModalIsOpened = true;
  }

  public closeRatingModal() {
    this.ratingModalIsOpened = false;
  }

  public updateTable(ratingDTO: RatingDTO) {
    this.ratingService.findPassengersEligibleRatings().subscribe(data => {
      this.passengerCanRateDrive = data;
    });
  }

  private getLoggedPerson() {
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
}
