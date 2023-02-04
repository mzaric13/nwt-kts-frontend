import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as locationsJson from '../../../../assets/locations.json';
import Swal from 'sweetalert2';
import { PassengerDTO } from '../../models/passenger-dto';
import { RouteDTO } from '../../models/route-dto';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css'],
})
export class RouteFormComponent implements OnInit {
  route = new FormGroup({
    pickup: new FormControl(''),
    destination: new FormControl(''),
    isChecked: new FormControl(false),
    extraLocation: new FormControl(''),
    favoriteRoute: new FormControl<RouteDTO | null>(null),
  });

  public locations: string[] = Object.values(locationsJson);

  public showDropdownPickup: boolean = false;

  public showDropdownDestination: boolean = false;

  public showDropdownExtraDestination: boolean = false;

  public showAdditionalInput: boolean = false;

  public routeLocations: string[] = [];

  favoriteRouteChosen: boolean = false;

  @Output() makeRouteEvent = new EventEmitter();

  @Output() customizeRideEvent = new EventEmitter<RouteDTO | null>();

  @Input() loggedPassenger!: PassengerDTO;

  @Input() searchRouteClicked: boolean = false;

  constructor() { }

  private initGeoCodeSearch() {
    this.locations.splice(this.locations.length - 2, 2);
  }

  ngOnInit(): void {
    this.route.get("favoriteRoute")?.valueChanges.subscribe(selectedValue => {
      if (selectedValue) {
        this.favoriteRouteChosen = true;
      } else {
        this.favoriteRouteChosen = false;
      }
    });
    this.initGeoCodeSearch();
  }

  onSubmit() {
    this.customizeRideEvent.emit(this.route.controls.favoriteRoute.value);
  }

  searchRoute() {
    if (!this.route.controls.pickup.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pickup location needs to have a value!',
      });
      return;
    }
    if (!this.route.controls.destination.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Destination needs to have a value!',
      });
      return;
    }
    this.makeRouteEvent.emit([
      this.route.controls.pickup.value,
      ...this.routeLocations,
      this.route.controls.destination.value,
    ]);
  }

  addExtraLocation() {
    if (this.route.controls.extraLocation.value) {
      this.routeLocations.push(this.route.controls.extraLocation.value);
      this.route.patchValue({ extraLocation: '' });
    }
  }

  removeRouteLocation(routeLocation: string) {
    const idx = this.routeLocations.indexOf(routeLocation);
    this.routeLocations.splice(idx, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.routeLocations,
      event.previousIndex,
      event.currentIndex
    );
  }

  showInputForExtraLocations() {
    this.showAdditionalInput = this.route.controls.isChecked.value!;
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

  openDropdownExtraDestination() {
    this.showDropdownExtraDestination = true;
  }

  closeDropdownExtraDestination() {
    this.showDropdownExtraDestination = false;
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

  selectExtraDestination(address: string) {
    this.route.patchValue({ extraLocation: address });
    this.showDropdownExtraDestination = false;
  }

  getExtraDestination(): string {
    return this.route.controls.extraLocation.value!;
  }
}
