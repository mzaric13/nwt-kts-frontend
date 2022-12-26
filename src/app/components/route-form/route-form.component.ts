import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  public locations: string[] = Object.values(locationsJson);

  public showDropdownPickup: boolean = false;

  public showDropdownDestination: boolean = false;

  @Output() makeRoute = new EventEmitter();

  constructor() {}

  private initGeoCodeSearch() {
    this.locations.splice(this.locations.length - 2, 2);
  }

  ngOnInit(): void {
    this.initGeoCodeSearch();
  }

  onSubmit() {
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
}
