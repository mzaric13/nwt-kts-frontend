import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { PointCreationDTO } from 'src/app/shared/models/point-creation-dto';
import { PointDTO } from 'src/app/shared/models/point-dto';

@Component({
  selector: 'app-drive-end-form',
  templateUrl: './drive-end-form.component.html',
  styleUrls: ['./drive-end-form.component.css']
})
export class DriveEndFormComponent implements OnInit {

  @Input() driverPosition!: PointDTO;

  @Input() endLocation!: PointCreationDTO;

  @Output() endDriveEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.endDriveEvent.emit();
  }

  calculateDistance() {
    return Math.abs(this.driverPosition.latitude - this.endLocation.latitude) < 10e-4 && Math.abs(this.driverPosition.longitude - this.endLocation.longitude) < 10e-4;
  }

}
