import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private passengerService: PassengerService) { }
  //1668002400000 nov 9 2022 3:00:00   1668175200000 nov 11 2022 3:00:00
  ngOnInit(): void {
    let startDate = new Date(1668002400000);
    let endDate = new Date(1668175200000);
    this.passengerService.createPassengerChart(startDate, endDate).subscribe(data => {
      console.log(data);
    })
  }

}
