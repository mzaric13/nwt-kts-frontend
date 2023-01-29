import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drive-end-form',
  templateUrl: './drive-end-form.component.html',
  styleUrls: ['./drive-end-form.component.css']
})
export class DriveEndFormComponent implements OnInit {

  @Output() endDriveEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.endDriveEvent.emit();
  }

}
