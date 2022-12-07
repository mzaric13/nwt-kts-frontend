import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-modal-personal-info-change',
  templateUrl: './modal-personal-info-change.component.html',
  styleUrls: ['./modal-personal-info-change.component.css']
})
export class ModalPersonalInfoChangeComponent implements OnInit, AfterViewInit {

  // treba default vrednosti da budu podaci od ulogovanog korisnika
  personalInfoForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    surname: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    city: ['', [Validators.required, Validators.pattern("^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$")]],
    phoneNumber: ['', [Validators.required, Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{2}[-\\s.]?[0-9]{5,7}$")]],
  })

  @Input() passenger!: PassengerDTO;

  personalInfoModal: any;


  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService
  ) { }
    
  ngOnInit(): void {
    this.personalInfoForm.value.name = this.passenger.name;
    this.personalInfoForm.value.surname = this.passenger.surname;
    this.personalInfoForm.value.city = this.passenger.city;
    this.personalInfoForm.value.phoneNumber = this.passenger.phoneNumber;
  }

  ngAfterViewInit(): void {
  }

  openModal() {
    //this.personalInfoModal = new Modal(document.getElementById('updatePersonalInfo')!);
    //this.personalInfoModal.show();
  }


  updatePersonalInfo() {
    this.personalInfoModal.hide();
    this.passenger.name = this.personalInfoForm.value.name || '';
    this.passenger.surname = this.personalInfoForm.value.surname || '';
    this.passenger.city = this.personalInfoForm.value.city || '';
    this.passenger.phoneNumber = this.personalInfoForm.value.phoneNumber || '';
    this.passengerService.updatePersonalInfoPassenger(this.passenger).subscribe()
  }

}
