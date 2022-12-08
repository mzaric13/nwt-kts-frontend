import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-personal-info-change',
  templateUrl: './modal-personal-info-change.component.html',
  styleUrls: ['./modal-personal-info-change.component.css']
})
export class ModalPersonalInfoChangeComponent implements OnInit, AfterContentInit {

  // treba default vrednosti da budu podaci od ulogovanog korisnika
  personalInfoForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    surname: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
    city: ['', [Validators.required, Validators.pattern("^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$")]],
    phoneNumber: ['', [Validators.required, Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{2}[-\\s.]?[0-9]{5,7}$")]],
  })

  @Input() passenger!: PassengerDTO;

  @Output() passengerChange: EventEmitter<PassengerDTO> = new EventEmitter<PassengerDTO>();

  @Output() personalInfoModalClosed = new EventEmitter();

  personalInfoModal: any;

  displayStyle = "none";

  passengerForForm!: PassengerDTO;

  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService,
    private router: Router,
  ) { }
    
  ngOnInit(): void {
    this.personalInfoForm.value.name = this.passenger.name;
    this.personalInfoForm.value.surname = this.passenger.surname;
    this.personalInfoForm.value.city = this.passenger.city;
    this.personalInfoForm.value.phoneNumber = this.passenger.phoneNumber;
    this.passengerForForm = JSON.parse(JSON.stringify(this.passenger));
  }

  ngAfterContentInit(): void {
    this.displayStyle = "block";
  }


  updatePersonalInfo() {
    this.passenger = this.passengerForForm;
    this.passengerService.updatePersonalInfoPassenger(this.passenger).subscribe(data => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title:  data.name + ' ' + data.surname + ', you have successfully changed your personal information.',
        showConfirmButton: false,
        timer: 3000
      })
      this.reloadPage();
    },
    error => {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title:  'An unknown error has occured.',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

  closeModal() {
    this.personalInfoModalClosed.emit();
    this.passengerForForm = JSON.parse(JSON.stringify(this.passenger));
  }


  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/passenger-profile']);
  }

}
