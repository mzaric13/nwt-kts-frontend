import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet.markercluster';
import { DriverDTO } from 'src/app/models/driver-dto';
const l = require('leaflet');
require('leaflet.animatedmarker/src/AnimatedMarker');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  private map!: L.Map;
  private icon!: L.DivIcon;
  private route!: L.Routing.Control;

  @Input() drivers!: DriverDTO[];
  @Input() rideAddresses!: number[][];
  @Output() estimatedTimeEvent = new EventEmitter<number>();

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.25, 19.8345],
      zoom: 14,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    this.icon = L.divIcon({
      className: 'position-relative rotate--marker',
      html: '<div><img style="width: 50px;" src="https://www.pngkit.com/png/full/54-544296_red-top-view-clip-art-at-clker-cartoon.png" /></div>',
    });
  }

  constructor(private elByClassName: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const newDrivers = changes['drivers'];
    const driveAddresses = changes['rideAddresses'];

    if (driveAddresses) {
      const selectedAddresses: number[][] = driveAddresses.currentValue;
      if (selectedAddresses.length !== 0) {
        if (this.route) {
          this.map.removeControl(this.route);
        }
        const waypoints: L.LatLng[] = [];
        for (let selectedAddress of selectedAddresses) {
          waypoints.push(new L.LatLng(selectedAddress[0], selectedAddress[1]));
        }
        this.route = L.Routing.control({
          plan: L.Routing.plan(waypoints, {
            addWaypoints: false,
            draggableWaypoints: false,
          }),
          addWaypoints: false,
          showAlternatives: true,
          show: false,
          altLineOptions: {
            addWaypoints: false,
            styles: [
              {
                color: 'blue',
                stroke: true,
                opacity: 0.6,
              },
            ],
            extendToWaypoints: false,
            missingRouteTolerance: 5,
          },
        }).addTo(this.map);

        const instructions: HTMLElement = (<HTMLElement>(
          this.elByClassName.nativeElement
        )).querySelector(
          '.leaflet-routing-alternatives-container'
        ) as HTMLElement;
        instructions.style.display = 'none';

        const that = this;

        this.route.on('routeselected', function (e) {
          const time = Math.ceil(e.route.summary.totalTime / 60);
          that.estimatedTimeEvent.emit(time);
        });
      }
    }

    if (newDrivers) {
      if (
        newDrivers.previousValue !== undefined &&
        newDrivers.previousValue.length === 0
      ) {
        setTimeout(() => {
          this.addDriversToTheMap();
        }, 1000);
      }
    }
  }

  private addDriversToTheMap() {
    const latMin: number = 2300;
    const latMax: number = 3000;
    const lngMin: number = 7500;
    const lngMax: number = 9000;
    const markers = L.markerClusterGroup();
    for (const driver of this.drivers) {
      const lat = 45 + (Math.random() * (latMax - latMin) + latMin) / 10000;
      const lng = 19 + (Math.random() * (lngMax - lngMin) + lngMin) / 10000;
      driver.geoLocation = [lat, lng];
      let availability: string = '';
      if (driver.available) {
        availability =
          '<div style="font-family: Arial; color:green">Available</div>';
      } else {
        availability =
          '<div style="font-family: Arial; color:red">NOT available</div>';
      }
      const marker = L.marker([lat, lng], {
        icon: this.icon,
        riseOnHover: true,
      }).bindTooltip(
        '<div><div style="font-family: Arial;">' +
          driver.name +
          ' ' +
          driver.surname +
          '</div>' +
          availability +
          '</div>',
        {
          offset: L.point(15, 0),
          direction: 'top',
        }
      );
      markers.addLayer(marker);
    }
    this.map.addLayer(markers);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
