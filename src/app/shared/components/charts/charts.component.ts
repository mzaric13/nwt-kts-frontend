import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartCreationDTO } from '../../models/chart-creation-dto';
import { ChartObjectCreationDTO } from '../../models/chart-object-creation-dto';
import { DatesChartDTO } from '../../models/dates-chart-dto';
import { AdminService } from '../../services/admin.service';
import { DriverService } from '../../services/driver.service';
import { PassengerService } from '../../services/passenger.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  loggedPerson!: string;

  // options
  drivesPerDay: ChartObjectCreationDTO[] = [];
  drivenKilometersPerDay: ChartObjectCreationDTO[] = [];
  spentOrEarnedMoneyPerDay: ChartObjectCreationDTO[] = [];

  drivesPerDaySum: number = 0;
  drivenKilometersPerDaySum: number = 0;
  spentOrEarnedMoneyPerDaySum: number = 0;
  drivesPerDayAvg: number = 0;
  drivenKilometersPerDayAvg: number = 0;
  spentOrEarnedMoneyPerDayAvg: number = 0;

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
  yAxisLabelSpentOrEarnedMoneyPerDay: string = 'Money';
  timeline: boolean = true;


  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  graphsAreLoaded = false;

  constructor(private passengerService: PassengerService,
    private driverService: DriverService,
    private adminService: AdminService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getLoggedPerson();
  }

  public showGraphs() {

    let datesChartDTO: DatesChartDTO = {
      startDate: this.range.controls['start'].value as Date,
      endDate: this.range.controls['end'].value as Date
    }

    if (datesChartDTO.startDate === null || datesChartDTO.endDate === null) {
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'Both start and end date have to be entered!',
        showConfirmButton: false,
        timer: 3000
      });
    }
    else
    {
      this.graphsAreLoaded = false;
      this.clearData();
      this.createCharts(datesChartDTO);
    }
  }

  private createCharts(datesChartDTO: DatesChartDTO) {
    if (this.loggedPerson === "passenger") {
      this.createPassengerChart(datesChartDTO);
    }
    else if (this.loggedPerson === "driver") {
      this.createDriverChart(datesChartDTO);
    }
    else {
      this.createAdminChart(datesChartDTO);
    }
  }

  private getLoggedPerson() {
    if (this.tokenService.getRole() === "ROLE_ADMIN") {
      this.loggedPerson = "admin";
    }
    else if (this.tokenService.getRole() === "ROLE_DRIVER") {
      this.loggedPerson = "driver";
    }
    else
    {
      this.loggedPerson = "passenger";
    }
  }

  private clearData() {
    if (this.drivesPerDay.length > 0) {
      this.drivesPerDay.pop();
      this.drivenKilometersPerDay.pop();
      this.spentOrEarnedMoneyPerDay.pop();
    }
  }

  private setData(data: ChartCreationDTO) {
    if (data.drivesPerDay.series.length === 0) {
      Swal.fire({
        icon: 'info',
        position: 'center',
        title: 'There are no drives for the defined date range.',
        showConfirmButton: false,
        timer: 3000
      });
    }
    else {
      this.drivesPerDay.push(data.drivesPerDay);
      this.drivenKilometersPerDay.push(data.drivenKilometersPerDay);
      this.spentOrEarnedMoneyPerDay.push(data.moneySpentOrEarnedPerDay)
      this.graphsAreLoaded = true;
      this.calculateSumAvg(data.drivesPerDay, "drivesPerDay");
      this.calculateSumAvg(data.drivenKilometersPerDay, "drivenKilometersPerDay");
      this.calculateSumAvg(data.moneySpentOrEarnedPerDay, "moneySpentOrEarnedPerDay");
    }
  }

  private calculateSumAvg(chartObjectCreationDTO: ChartObjectCreationDTO, graph: string) {
    let sum = 0;
    let avg = 0;
    for (let element of chartObjectCreationDTO.series) {
      sum += element.value;
    }
    avg = sum / chartObjectCreationDTO.series.length;
    this.setSumAvg(sum, avg, graph);
  }

  private setSumAvg(sum: number, avg: number, graph: string) {
    if (graph === "drivesPerDay") {
      this.drivesPerDaySum = sum;
      this.drivesPerDayAvg = avg;
    }
    else if (graph === "drivenKilometersPerDay") {
      this.drivenKilometersPerDaySum = sum;
      this.drivenKilometersPerDayAvg = avg;
    }
    else {
      this.spentOrEarnedMoneyPerDaySum = sum;
      this.spentOrEarnedMoneyPerDayAvg = avg;
    }
  }

  private createPassengerChart(datesChartDTO: DatesChartDTO) {
    this.passengerService.createPassengerChart(datesChartDTO).subscribe(data => {
      this.setData(data);
    })
  }

  private createDriverChart(datesChartDTO: DatesChartDTO) {
    this.driverService.createDriverChart(datesChartDTO).subscribe(data => {
      this.setData(data);
    });
  }

  private createAdminChart(datesChartDTO: DatesChartDTO) {
    this.adminService.createAdminChart(datesChartDTO).subscribe(data => {
      this.setData(data);
    });
  }

}
