import { Component, Input, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: '[app-payment-card]',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css']
})
export class PaymentCardComponent implements OnInit {

  @Input() title! : string;

  @Input() price! : string;


  constructor(
    private passengerService: PassengerService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    render(
      {
          id: "#payments" + this.price.split('.')[0],
          currency: "USD",
          value: this.price,
          onApprove: (details) => {
            this.passengerService.getLoggedPassenger().subscribe(result => {
              this.passengerService.addTokens(Number(this.price.split('.')[0]), result).subscribe(result => {
                Swal.fire({
                  icon: 'success',
                  position: 'center',
                  title: this.price + ' tokens have been added to your account',
                  showConfirmButton: false,
                  timer: 3000
                })
              },
              err => {
                console.log(err);
              })
            },
            err => {
              console.log(err);
            });
          }
        }
      );
  }

}
