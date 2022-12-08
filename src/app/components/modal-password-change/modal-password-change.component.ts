import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PassengerDTO } from 'src/app/models/passenger-dto';

@Component({
  selector: 'app-modal-password-change',
  templateUrl: './modal-password-change.component.html',
  styleUrls: ['./modal-password-change.component.css']
})
export class ModalPasswordChangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() passenger!: PassengerDTO;

  @Output() passwordChangeModalClosed = new EventEmitter();

  

}
