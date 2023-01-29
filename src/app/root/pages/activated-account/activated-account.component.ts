import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PassengerService } from '../../../shared/services/passenger.service';

@Component({
  selector: 'app-activated-account',
  templateUrl: './activated-account.component.html',
  styleUrls: ['./activated-account.component.css']
})
export class ActivatedAccountComponent implements OnInit {

  id!: number;

  errorMessage = 'Something went wrong';

  isActivated = false;

  notActivated = false;

  constructor(private route: ActivatedRoute, private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let param = params.get('id');
      if (param !== null) {
        this.id = Number(param);
        this.activateAccount()
      }
      else {
        this.isActivated = false;
        this.notActivated = true;
      }
    })
  }

  activateAccount() {
    this.passengerService.activateAccount(this.id).subscribe(result => {
      this.isActivated = true;
      this.notActivated = false;
    }, error => {
      this.errorMessage = error.message;
      this.isActivated = false;
      this.notActivated = true;
    });
  }

}
