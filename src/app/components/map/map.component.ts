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
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

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
  markerGroup: L.MarkerClusterGroup = L.markerClusterGroup();
  driverMarkers: any = {};

  private colors = ["000000", "FF0000", "0000FF", "27FF00", "EC00FF", "FF008F", "FF8300", "005863",
    "FFC300", "C70039"];

  socket!: WebSocket;
  stompClient!: Stomp.Client;

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
    const newRoutes = changes['routes'];
    const newWaypoints = changes['waypoints'];
    const newDrivers = changes['drivers'];
    
    if (newRoutes || newWaypoints) {
      let routes: any;
      if (newRoutes) {
        routes = newRoutes.currentValue;
      }
      else {
        routes = this.routes;
      }
      if (routes.length !== 0) {
        if (this.routeLayers) {
          for (let routeLayer of this.routeLayers) {
            const idx = this.mainGroup.indexOf(routeLayer);
            this.mainGroup.splice(idx, 1);
          }
        }
        this.routeLayers = [];
        const routeWaypoints = changes['waypoints'].currentValue;
        let markerLayerGroup: L.LayerGroup = new L.LayerGroup();
        for (let waypoint of routeWaypoints) {
          let marker = L.marker(L.latLng(waypoint.latitude, waypoint.longitude));
          marker.addTo(markerLayerGroup);
        }
        this.routeLayers = [...this.routeLayers, markerLayerGroup];

        setTimeout(() => {
          this.routeIdxEvent.emit(0);
          this.estimatedTimeEvent.emit(this.calculateEstimatedTime(routes[0].duration));
          this.estimatedCostEvent.emit(this.calculateDistance(routes[0].distance));
        }, 100)

        this.routeIdxs.clear();
        
        for (let i = 0; i < routes.length; i++) {
          const route = routes[i];
          let geoLayerGroup: L.LayerGroup = new L.LayerGroup();
          let color = '';
          do {
            color = this.colors[Math.floor(Math.random() * 10)];
          } while (this.routeIdxs.get(color) !== undefined);
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
          this.routeLayers = [...this.routeLayers, geoLayerGroup];
        }
        this.mainGroup = [...this.mainGroup, ...this.routeLayers];
      }
    }

    if (newDrivers) {
      let drivers: DriverDTO[] = newDrivers.currentValue;
      if (drivers) {
        for (let driver of drivers) {
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
          this.markerGroup.addLayer(marker);
          this.mainGroup = [...this.mainGroup, this.markerGroup];
          this.driverMarkers[driver.id] = marker;
        }
      }
    }
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
    this.initializeWebSocketConnection();
    this.initMap();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS('http://localhost:9000/secured/map');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function () {
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/secured/simulation/update-vehicle-position', (message: { body: string }) => {
      let driver: DriverDTO = JSON.parse(message.body);
      let existingDriver = this.driverMarkers[driver.id];
      existingDriver.setLatLng([driver.location.latitude, driver.location.longitude]);
      existingDriver.update()
    });
  }
}
