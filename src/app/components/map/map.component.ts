import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
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

  @Input() pickupGeoLocation: number[] = [];
  @Input() destinationGeoLocation: number[] = [];

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

    L.marker([45.25, 19.85], {
      icon: this.icon,
      riseOnHover: true,
    })
      .addTo(this.map)
      .bindTooltip('<div style="font-family: Arial;">Vozi vozi me</div>', {
        offset: L.point(15, 0),
        direction: 'top',
      });
    L.Routing.control({
      plan: L.Routing.plan([L.latLng(45.25, 19.85), L.latLng(45.26, 19.87)], {
        addWaypoints: false,
        draggableWaypoints: false,
      }),
      addWaypoints: false,
      showAlternatives: true,
      show: false,
    }).addTo(this.map);

    const instructions: HTMLElement = (<HTMLElement>(
      this.elByClassName.nativeElement
    )).querySelector('.leaflet-routing-alternatives-container') as HTMLElement;
    instructions.style.display = 'none';
  }

  constructor(private elByClassName: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const startingPoint: number[] = changes['pickupGeoLocation'].currentValue;
    const endPoint: number[] = changes['destinationGeoLocation'].currentValue;
    if (startingPoint.length !== 0 && endPoint.length !== 0) {
      const route = L.Routing.control({
        plan: L.Routing.plan(
          [
            L.latLng(startingPoint[0], startingPoint[1]),
            L.latLng(endPoint[0], endPoint[1]),
          ],
          {
            addWaypoints: false,
            draggableWaypoints: false,
          }
        ),
        addWaypoints: false,
        showAlternatives: true,
        show: false,
      }).addTo(this.map);

      const that = this;

      route.on('routeselected', function (e) {
        const routePoints = e.route.coordinates;
        const lines: L.LatLng[] = [];
        for (const routePoint of routePoints) {
          lines.push(new L.LatLng(routePoint.lat, routePoint.lng));
        }
        const line = L.polyline(lines);

        const animatedmarker = l
          .animatedMarker(line.getLatLngs(), {
            distance: 500,
            interval: 500,
            icon: that.icon,
          })
          .addTo(that.map);
      });
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
