import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DriveDTO } from 'src/app/models/drive-dto';

@Component({
  selector: 'app-modal-map-history-view',
  templateUrl: './modal-map-history-view.component.html',
  styleUrls: ['./modal-map-history-view.component.css']
})
export class ModalMapHistoryViewComponent implements OnInit {

  @Input() drive!: DriveDTO;
  @Output() modalIsClosed = new EventEmitter();
  displayStyle = "none";

  constructor() { }

  closeModal() {
    this.modalIsClosed.emit();
  }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

}
