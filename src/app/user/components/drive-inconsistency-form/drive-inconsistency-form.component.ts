import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-drive-inconsistency-form',
  templateUrl: './drive-inconsistency-form.component.html',
  styleUrls: ['./drive-inconsistency-form.component.css']
})
export class DriveInconsistencyFormComponent implements OnInit {

  driveInconsistency: FormControl = new FormControl('');

  @Output() reportInconsistencyEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reportInconsistencyEvent.emit(this.driveInconsistency.value);
    this.driveInconsistency.setValue('');
  }

}
