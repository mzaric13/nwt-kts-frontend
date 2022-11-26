import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PassengerCreationDTO } from 'src/app/models/passenger-creation-dto';
import { PassengerService } from '../../services/passenger.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  types: String[] = [];

  registrationForm = this.formBuilder.group({
    userGroup: this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]],
      name: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Z]\\w*")]],
      city: ['', [Validators.required, Validators.pattern("^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$")]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{2}[-\\s.]?[0-9]{5,7}$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }),
    vehicleGroup: this.formBuilder.group({
      registrationNumber: ['', [Validators.required, Validators.pattern("([A-Za-z])([A-Za-z])([0-9][0-9][0-9])([A-Za-z])([A-Za-z])")]],
      vehicleName: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })
  });


  constructor(
    private formBuilder: FormBuilder,
    private passengerService: PassengerService,
    ) { }

  ngOnInit(): void {
    //ucitati tipove vozila sa backa ako je admin taj koji je ulogovan
    this.types = ['type1', 'type2', 'type3'];
  }

  register(): void {
    //if role == admin onda vozaca, else putnika registrujemo
    this.passengerService.registerPassenger(new PassengerCreationDTO(this.registrationForm.controls['userGroup'].value.email as string, 
      this.registrationForm.controls['userGroup'].value.name as string, this.registrationForm.controls['userGroup'].value.surname as string,
      this.registrationForm.controls['userGroup'].value.city as string, this.registrationForm.controls['userGroup'].value.phoneNumber as string, 
      this.registrationForm.controls['userGroup'].value.password as string, this.registrationForm.controls['userGroup'].value.confirmPassword as string)).subscribe(
        passengerDTO => {
          console.log(passengerDTO);
        } 
       )
  }

}
