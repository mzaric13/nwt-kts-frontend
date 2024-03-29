import { Component, OnInit } from '@angular/core';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { PassengerDTO } from '../../../shared/models/passenger-dto';

@Component({
  selector: 'app-page-change-blocked-status',
  templateUrl: './page-change-blocked-status.component.html',
  styleUrls: ['./page-change-blocked-status.component.css']
})
export class PageChangeBlockedStatusComponent implements OnInit {
  
  chosenPassenger! : PassengerDTO | null;
  chosenDriver! : DriverDTO | null;
  modalIsOpened = false;
  passenger!: PassengerDTO;
  driver!: DriverDTO;
  
  constructor() { }

  ngOnInit(): void {
  }

  openPassengerModal(passenger : PassengerDTO) {
    this.modalIsOpened = true;
    this.chosenPassenger = passenger;
  }

  openDriverModal(driver : DriverDTO) {
    this.modalIsOpened = true;
    this.chosenDriver = driver;
  }

  closeModal(){
    this.modalIsOpened = false;
    this.chosenDriver = null;
    this.chosenPassenger = null;
  } 

  passengerChanged(passengerDTO: PassengerDTO) {
    this.passenger = passengerDTO;
  }

  driverChanged(driverDTO: DriverDTO) {
    this.driver = driverDTO;
  }

}
