import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PointCreationDTO } from 'src/app/models/point-creation-dto';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  private icon!: L.DivIcon;
  private routeLayers: L.LayerGroup[] = [];

  @Input() waypoints: PointCreationDTO[] = [];
  @Input() drivers!: DriverDTO[];
  @Input() routes: any = [];
  @Output() estimatedTimeEvent = new EventEmitter<number>();
  @Output() estimatedCostEvent = new EventEmitter<number>();
  @Output() waypointsEvent = new EventEmitter<PointCreationDTO[]>();
  @Output() routeIdxEvent = new EventEmitter<number>();

  private routeIdxs = new Map<string, number>();

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 5,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    center: L.latLng(45.25, 19.8345),
    zoom: 14,
  }

  mainGroup: L.LayerGroup[] = [];

  private initMap(): void {
    this.icon = L.divIcon({
      className: 'position-relative rotate--marker',
      html: '<div><img style="width: 50px;" src="https://www.pngkit.com/png/full/54-544296_red-top-view-clip-art-at-clker-cartoon.png" /></div>',
    });
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const newDrivers = changes['drivers'];
    const newRoutes = changes['routes'];

    if (newRoutes) {
      const routes: any = newRoutes.currentValue;
      if (routes.length !== 0) {
        if (this.routeLayers) {
          for (let routeLayer of this.routeLayers) {
            const idx = this.mainGroup.indexOf(routeLayer);
            this.mainGroup.splice(idx, 1);
          }
        }
        const routeWaypoints = changes['waypoints'].currentValue;
        let markerLayerGroup: L.LayerGroup = new L.LayerGroup();
        for (let waypoint of routeWaypoints) {
          let marker = L.marker(L.latLng(waypoint.latitude, waypoint.longitude));
          marker.addTo(markerLayerGroup);
        }
        this.routeLayers.push(markerLayerGroup);
        this.mainGroup = [...this.mainGroup, markerLayerGroup];

        setTimeout(() => {
          this.routeIdxEvent.emit(0);
          this.estimatedTimeEvent.emit(this.calculateEstimatedTime(routes[0].duration));
          this.estimatedCostEvent.emit(this.calculateDistance(routes[0].distance));
        }, 100)
        
        for (let i = 0; i < routes.length; i++) {
          const route = routes[i];
          let geoLayerGroup: L.LayerGroup = new L.LayerGroup();
          let color = Math.floor(Math.random() * 16777215).toString(16);
          this.routeIdxs.set(color, i);
          for (let leg of route['legs']) {
            for (let step of leg['steps']) {
              let routeLayer = L.geoJSON(step.geometry);
              routeLayer.setStyle({ color: `#${color}` });

              const that = this;
              routeLayer.on('click', function (e) {
                let routeColor = e.propagatedFrom.options.color.substring(1);
                let routeIdx: number = that.routeIdxs.get(routeColor)!;
                that.routeIdxEvent.emit(routeIdx);
                that.estimatedTimeEvent.emit(that.calculateEstimatedTime(routes[routeIdx].duration));
                that.estimatedCostEvent.emit(that.calculateDistance(routes[routeIdx].distance));
              })

              routeLayer.addTo(geoLayerGroup);
            }
          }
          this.routeLayers.push(geoLayerGroup);
          this.mainGroup = [...this.mainGroup, geoLayerGroup];
        }
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
    const markers = L.markerClusterGroup();
    for (const driver of this.drivers) {
      let availability: string = '';
      if (driver.available) {
        availability =
          '<div style="font-family: Arial; color:green">Available</div>';
      } else {
        availability =
          '<div style="font-family: Arial; color:red">NOT available</div>';
      }
      const marker = L.marker([driver.location.latitude, driver.location.longitude], {
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
    this.mainGroup.push(markers);
  }

  private calculateEstimatedTime(time: number) {
    return Math.round(time / 60);
  }

  private calculateDistance(totalDistance: number) {
    const distance: number = totalDistance / 1000;
    return Number.parseFloat(distance.toFixed(1));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
