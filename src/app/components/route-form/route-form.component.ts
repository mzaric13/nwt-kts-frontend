import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import OpenStreetMapProvider from 'leaflet-geosearch/lib/providers/openStreetMapProvider';
import * as locationsJson from '../../../assets/locations.json';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css'],
})
export class RouteFormComponent implements OnInit {
  route = new FormGroup({
    pickup: new FormControl(''),
    destination: new FormControl(''),
  });

  private pickupCoordinates!: number[];
  private destinationCoordinates!: number[];

  results!: string[];

  public showDropdownPickup: boolean = false;

  public showDropdownDestination: boolean = false;

  private provider!: OpenStreetMapProvider;

  @Output() makeRoute = new EventEmitter();

  constructor() {}

  private initGeoCodeSearch() {
    this.provider = new OpenStreetMapProvider({
      params: {
        countryCodes: 'rs',
      },
    });

    this.locations.splice(this.locations.length - 2, 2);
  }

  ngOnInit(): void {
    this.initGeoCodeSearch();
  }

  onSubmit() {
    const a: string = this.route.controls.pickup.value!;
    let labels: string[];
    this.provider.search({ query: a }).then((result) => {
      console.log(result[0].x, result[0].y);
      labels = result.map((r) => r.label);
      this.results = labels.map((label) =>
        label
          .split(',')
          .slice(0, labels.length - 5)
          .join('')
      );
    });
    this.makeRoute.emit([
      this.route.controls.pickup.value,
      this.route.controls.destination.value,
    ]);
  }

  openDropdownPickup() {
    this.showDropdownPickup = true;
  }

  closeDropdownPickup() {
    this.showDropdownPickup = false;
  }

  openDropdownDestination() {
    this.showDropdownDestination = true;
  }

  closeDropdownDestination() {
    this.showDropdownDestination = false;
  }

  selectPickupLocation(address: string) {
    this.route.patchValue({ pickup: address });
    this.showDropdownPickup = false;
  }

  getPickupLocation(): string {
    return this.route.controls.pickup.value!;
  }

  selectDestination(address: string) {
    this.route.patchValue({ destination: address });
    this.showDropdownDestination = false;
  }

  getDestination(): string {
    return this.route.controls.destination.value!;
  }

  public locations: string[] = Object.values(locationsJson);
}
