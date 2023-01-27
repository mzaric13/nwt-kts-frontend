import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RatingDTO } from 'src/app/models/rating-dto';
import Swal from 'sweetalert2';
import { DriveDTO } from 'src/app/models/drive-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-modal-give-rating',
  templateUrl: './modal-give-rating.component.html',
  styleUrls: ['./modal-give-rating.component.css']
})
export class ModalGiveRatingComponent implements OnInit {

  displayStyle = "none";

  constructor(private ratingService: RatingService, private formBuilder: FormBuilder, private router: Router) { }

  @Input() drive!: DriveDTO;

  @Output() modalIsClosed = new EventEmitter();

  @Output() ratingHasBeenGiven = new EventEmitter();

  ratingForm = this.formBuilder.group({
    driverRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    vehicleRating: ['', [Validators.required,Validators.min(1), Validators.max(5)]],
    comment: ''
  })

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  closeModal(){
    this.modalIsClosed.emit();
  }

  giveRating(){
    
    let ratingDTO: RatingDTO = {
      driverRating: this.ratingForm.value.driverRating as unknown as number,
      vehicleRating: this.ratingForm.value.vehicleRating as unknown as number,
      comment: this.ratingForm.value.comment as string,
      driveId: this.drive.id,
      passengerId: 0
    }
    
    this.ratingService.createRating(ratingDTO).subscribe(data => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title: 'You have successfully given a rating.',
        showConfirmButton: false,
        timer: 3000
      })
      this.ratingHasBeenGiven.emit(data);
      this.closeModal();
   })
   
  }

}
