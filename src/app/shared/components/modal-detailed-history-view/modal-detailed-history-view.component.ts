import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DriveDTO } from '../../models/drive-dto';
import { RatingService } from '../../services/rating.service';

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

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.displayStyle = "block";
    this.ratingService.getDriveRatings(this.drive.id).subscribe(data => {
      let isFound = false;
      for (let passenger of this.drive.passengers) {
        isFound = false;
        for (let rating of data) {
          if (rating.passengerId === passenger.id) {
            isFound = true;
            this.vehicleRatings.push(rating.vehicleRating);
            this.driverRatings.push(rating.driverRating);
          }
        }
        if (!isFound) {
          this.vehicleRatings.push(0);
          this.driverRatings.push(0);
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

  getPassengerImageSrc(i: number) {
    const passenger = this.drive.passengers.at(i);
    console.log(passenger);
    let imgSrc = '../../../../assets/default.jpg';
    if (passenger !== undefined) {
      if (passenger.city === null) imgSrc = passenger.profilePicture;
      else {
        if (passenger.imageData !== undefined && passenger.imageData !== null) imgSrc = 'data:image/jpeg;base64,' + passenger.imageData.imageData;
      }
    }
    return imgSrc;
  }

  getDriverImageSrc() {
    const driver = this.drive.driver;
    let imgSrc = '../../../../assets/default.jpg';
    if (driver.imageData !== undefined && driver.imageData !== null) imgSrc = 'data:image/jpeg;base64,' + driver.imageData.imageData;
    return imgSrc;
  }

}
