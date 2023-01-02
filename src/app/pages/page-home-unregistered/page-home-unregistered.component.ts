import { Component, Input, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/models/driver-dto';
import { DriverService } from 'src/app/services/driver.service';
import { GeocodeService } from 'src/app/services/geocode.service';

@Component({
  selector: 'app-page-home-unregistered',
  templateUrl: './page-home-unregistered.component.html',
  styleUrls: ['./page-home-unregistered.component.css'],
})
export class PageHomeUnregisteredComponent implements OnInit {
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

    this.pickupGeoLocation = [pickupResult[0].y, pickupResult[0].x];
    this.destinationGeoLocation = [
      destinationResult[0].y,
      destinationResult[0].x,
    ];
  }

  getEstimatedTime(time: number) {
    this.estimatedTime = time;
  }
}
