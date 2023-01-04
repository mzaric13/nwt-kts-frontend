import { Component, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';
import { GeocodeService } from 'src/app/services/geocode.service';
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

  pickupGeoLocation: number[] = [];
  destinationGeoLocation: number[] = [];
  drivers: DriverDTO[] = [];
  estimatedTime: number = 0;

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

  async makeRoute(route: string[]) {
    const pickupResult = await this.geocodeService.getGeocodes(route[0]);
    const destinationResult = await this.geocodeService.getGeocodes(route[1]);
    try {
      this.pickupGeoLocation = [pickupResult[0].y, pickupResult[0].x];
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Pickup location doesn't exist",
      });
    }
    try {
      this.destinationGeoLocation = [
        destinationResult[0].y,
        destinationResult[0].x,
      ];
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Destination location doesn't exist",
      });
    }
  }

  getEstimatedTime(time: number) {
    this.estimatedTime = time;
  }
}
