import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ModalPersonalInfoChangeComponent } from 'src/app/components/modal-personal-info-change/modal-personal-info-change.component';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-page-passenger-profile',
  templateUrl: './page-passenger-profile.component.html',
  styleUrls: ['./page-passenger-profile.component.css']
})
export class PagePassengerProfileComponent implements OnInit, AfterViewInit {
  @ViewChild('modalPersonalInfo', { static: false })
  modalPersonalInfo!: ModalPersonalInfoChangeComponent;

  loggedPassenger!: PassengerDTO;

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

  ngAfterViewInit(): void {
    
  }

  openModal(type: string) : void {
    if (type === "personalInfo" && this.isLoaded) {
      this.personalInfo = true;
    }
    this.modalPersonalInfo?.openModal();
  }

  closeModal(type: string) : void {
    //this.personalInfo = false;
  }

}
