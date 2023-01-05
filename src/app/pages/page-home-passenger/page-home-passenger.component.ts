import { Component, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';
import { GeocodeService } from 'src/app/services/geocode.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-home-passenger',
  templateUrl: './page-home-passenger.component.html',
  styleUrls: ['./page-home-passenger.component.css'],
})
export class PageHomePassengerComponent implements OnInit {
  constructor(
    private readonly geocodeService: GeocodeService,
    private readonly driverService: DriverService
  ) {}

  rideAddresses: number[][] = [];
  drivers: DriverDTO[] = [];
  estimatedTime: number = 0;

  demoDragAndDrop: string[] = ['TEst1', 'test2', 'test3', 'test4', 'test5'];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.demoDragAndDrop,
      event.previousIndex,
      event.currentIndex
    );
  }

  test(item: string) {
    const index = this.demoDragAndDrop.indexOf(item);
    this.demoDragAndDrop.splice(index, 1);
  }

  ngOnInit(): void {
    try {
      this.driverService.getAllDrivers().subscribe({
        next: (drivers: DriverDTO[]) => {
          this.drivers = drivers;
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async makeRoute(routes: string[]) {
    const driveAddresses: number[][] = [];
    for (let route of routes) {
      const routeResult = await this.geocodeService.getGeocodes(route);
      try {
        driveAddresses.push([routeResult[0].y, routeResult[0].x]);
      } catch (e) {
        const text = 'Location ' + route + " doesn't exist";
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text,
        });
      }
    }
    this.rideAddresses = driveAddresses;
  }

  getEstimatedTime(time: number) {
    this.estimatedTime = time;
  }
}
