import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DriveDTO } from 'src/app/models/drive-dto';
import { RatingService } from 'src/app/services/rating.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-detailed-history-view',
  templateUrl: './modal-detailed-history-view.component.html',
  styleUrls: ['./modal-detailed-history-view.component.css']
})
export class ModalDetailedHistoryViewComponent implements OnInit {

  displayStyle = "none";
  loggedPerson!: string;
  driverRating!: number;
  vehicleRating!: number;
  vehicleRatings: number[] = [];
  driverRatings: number[] = [];

  @Input() drive!: DriveDTO;
  @Output() modalIsClosed = new EventEmitter();

  constructor(private tokenService: TokenService, private ratingService: RatingService) { }

  ngOnInit(): void {
    this.displayStyle = "block";
    /* vrv ne treba
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
    */
    this.ratingService.getDriveRatings(this.drive.id).subscribe(data => {
      for (let passenger of this.drive.passengers) {
        for (let rating of data) {
          if (rating.passengerId === passenger.id) {
            this.vehicleRatings.push(rating.vehicleRating);
            this.driverRatings.push(rating.driverRating);
          }
        }
      }
    })
    this.ratingService.getDriverAndVehicleAverageRating(this.drive.driver.id).subscribe(data => {
      this.driverRating = data[0];
      this.vehicleRating = data[1];
    })
  }

  closeModal() {
    this.modalIsClosed.emit();
  }

}
