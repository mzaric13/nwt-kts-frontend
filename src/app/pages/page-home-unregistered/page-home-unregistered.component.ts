import { Component, Input, OnInit } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocode.service';

@Component({
  selector: 'app-page-home-unregistered',
  templateUrl: './page-home-unregistered.component.html',
  styleUrls: ['./page-home-unregistered.component.css'],
})
export class PageHomeUnregisteredComponent implements OnInit {
  constructor(private readonly geocodeService: GeocodeService) {}

  ngOnInit(): void {}

  pickupGeoLocation: number[] = [];
  destinationGeoLocation: number[] = [];

  async makeRoute(route: string[]) {
    const pickupResult = await this.geocodeService.getGeocodes(route[0]);
    const destinationResult = await this.geocodeService.getGeocodes(route[1]);

    this.pickupGeoLocation = [pickupResult[0].y, pickupResult[0].x];
    this.destinationGeoLocation = [
      destinationResult[0].y,
      destinationResult[0].x,
    ];
  }
}
