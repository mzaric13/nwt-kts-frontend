import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { RatingDTO } from 'src/app/models/rating-dto';
import { PassengerService } from 'src/app/services/passenger.service';
import { NgxStarRatingModule } from 'ngx-star-rating';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-give-rating',
  templateUrl: './modal-give-rating.component.html',
  styleUrls: ['./modal-give-rating.component.css']
})
export class ModalGiveRatingComponent implements OnInit {

  displayStyle = "none";

  constructor(private passengerService: PassengerService, private router: Router) { }

  //@Input() passenger!: PassengerDTO;
  //@Input() drive!: DriveDTO;

  @Output() modalRateIsClosed = new EventEmitter();

  driveRating!: number;
  vehicleRating = 0;
  comment!: string;

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  closeModal(){
    this.modalRateIsClosed.emit();
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/change-blocked-status']);
  }

  giveRating(){
    /*
    let ratingDTO: RatingDTO = {
      driveRating: this.driveRating,
      vehicleRating: this.vehicleRating,
      comment: this.comment,
      driveId: this.drive.id,
      passengerId: this.passenger.id
    }
    
    this.passengerService.createRating(ratingDTO).subscribe(data => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title: 'You have successfully given a rating.',
        showConfirmButton: false,
        timer: 3000
      })
      this.reloadPage();
   })
   */
  }

}
