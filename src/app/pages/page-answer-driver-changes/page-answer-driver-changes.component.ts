import { Component, OnInit } from '@angular/core';
import { DriverDataDTO } from 'src/app/models/driver-data-dto';

@Component({
  selector: 'app-page-answer-driver-changes',
  templateUrl: './page-answer-driver-changes.component.html',
  styleUrls: ['./page-answer-driver-changes.component.css']
})
export class PageAnswerDriverChangesComponent implements OnInit {

  constructor() { }

  modalIsOpened = false;
  driverDataDTO! : DriverDataDTO;
  answeredDriverDataDTO!: DriverDataDTO;

  ngOnInit(): void {
  }

  openModal(driverDataDTO: DriverDataDTO) {
    this.driverDataDTO = driverDataDTO;
    this.modalIsOpened = true;
  }

  closeModal(){
    this.modalIsOpened = false;
  } 

  driverDataAnswered(driverDataDTO: DriverDataDTO) {
    this.answeredDriverDataDTO = driverDataDTO;
  }
}
