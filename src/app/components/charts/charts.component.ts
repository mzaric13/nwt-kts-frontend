import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartObjectCreationDTO } from 'src/app/models/chart-object-creation-dto';
import { DatesChartDTO } from 'src/app/models/dates-chart-dto';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  // options
  drivesPerDay: ChartObjectCreationDTO[] = [];
  drivenKilometersPerDay: ChartObjectCreationDTO[] = [];
  spentOrEarnedMoneyPerDay: ChartObjectCreationDTO[] = [];
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabelDrivesPerDay: string = 'Number of drives';
  yAxisLabelDrivenKilometersPerDay: string = 'Driven kilometers';
  yAxisLabelSpentOrEarnedMoneyPerDay: string = 'Spent or earned money';
  timeline: boolean = true;


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  graphsAreLoaded = false;

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {

  }

  showGraphs() {
    let datesChartDTO: DatesChartDTO = {
      startDate: this.range.controls['start'].value as Date,
      endDate: this.range.controls['end'].value as Date
    }
    this.passengerService.createPassengerChart(datesChartDTO).subscribe(data => {
      this.drivesPerDay.push(data.drivesPerDay);
      this.drivenKilometersPerDay.push(data.drivenKilometersPerDay);
      this.spentOrEarnedMoneyPerDay.push(data.moneySpentOrEarnedPerDay)
      this.graphsAreLoaded = true;
    })
  }

}
