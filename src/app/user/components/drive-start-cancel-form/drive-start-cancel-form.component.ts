import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PointCreationDTO } from 'src/app/shared/models/point-creation-dto';
import { PointDTO } from 'src/app/shared/models/point-dto';

@Component({
  selector: 'app-drive-start-cancel-form',
  templateUrl: './drive-start-cancel-form.component.html',
  styleUrls: ['./drive-start-cancel-form.component.css']
})
export class DriveStartCancelFormComponent implements OnInit {

  showCancelDrive: boolean = false;

  isChecked = new FormControl(false);

  cancelReasoning = new FormControl('');

  @Input() driverPosition!: PointDTO;
  @Input() startPosition!: PointCreationDTO;

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

  calculateDistance() {
    return Math.abs(this.driverPosition.latitude - this.startPosition.latitude) < 10e-4 && Math.abs(this.driverPosition.longitude - this.startPosition.longitude) < 10e-4;
  }

}
