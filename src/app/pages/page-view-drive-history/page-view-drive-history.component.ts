import { Component, OnInit } from '@angular/core';
import { DriveDTO } from 'src/app/models/drive-dto';

@Component({
  selector: 'app-page-view-drive-history',
  templateUrl: './page-view-drive-history.component.html',
  styleUrls: ['./page-view-drive-history.component.css']
})
export class PageViewDriveHistoryComponent implements OnInit {

  drive!: DriveDTO;
  modalIsOpened = false;
  mapModalIsOpened = false;

  constructor() { }

  ngOnInit(): void {
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
