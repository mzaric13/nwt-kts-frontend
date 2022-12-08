import { Component, OnChanges, Input, OnInit, SimpleChanges } from '@angular/core';
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
      console.log(this.loggedPassenger);
    }
  }

  closeModal() : void {
    this.personalInfo = false;
  }

  

}
