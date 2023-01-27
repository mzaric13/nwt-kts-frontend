import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-drive-start-cancel-form',
  templateUrl: './drive-start-cancel-form.component.html',
  styleUrls: ['./drive-start-cancel-form.component.css']
})
export class DriveStartCancelFormComponent implements OnInit {

  showCancelDrive: boolean = false;

  isChecked = new FormControl(false);

  cancelReasoning = new FormControl('');

  @Output() startDriveEvent = new EventEmitter();
  @Output() cancelDriveEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.showCancelDrive) {
      this.startDriveEvent.emit();
    } else {
      this.cancelDriveEvent.emit(this.cancelReasoning.value!);
    }
  }

  showCancelDriveInputs() {
    this.showCancelDrive = this.isChecked.value!;
  }

}
