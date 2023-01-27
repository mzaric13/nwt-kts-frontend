import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DriveDTO } from 'src/app/models/drive-dto';
import { DriverDTO } from 'src/app/models/driver-dto';

@Component({
  selector: 'app-map-drive-simulation',
  templateUrl: './map-drive-simulation.component.html',
  styleUrls: ['./map-drive-simulation.component.css']
})
export class MapDriveSimulationComponent implements OnInit, AfterViewInit, OnChanges {

  icon!: L.DivIcon;
  routeLayers: L.LayerGroup[] = [];

  @Input() drive!: DriveDTO;
  @Input() routes!: any;
  @Output() getDurationEvent = new EventEmitter<number>();

  private routeIdxs = new Map<string, number>();
  private colors = ["000000", "FF0000", "0000FF", "27FF00", "EC00FF", "FF008F", "FF8300", "005863",
    "FFC300", "C70039"];
  
  markerGroup: L.MarkerClusterGroup = L.markerClusterGroup();
  driverMarkers: any = {};

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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const newRoutes = changes['routes'];
    if (newRoutes) {
      const routes: any = newRoutes.currentValue;
      if (routes) {
        let markerLayerGroup: L.LayerGroup = new L.LayerGroup();
        for (let waypoint of this.drive.route.waypoints) {
          let marker = L.marker(L.latLng(waypoint.latitude, waypoint.longitude));
          marker.addTo(markerLayerGroup);
        }
        this.routeLayers = [...this.routeLayers, markerLayerGroup];
        this.routeIdxs.clear();

        const route = routes.routes[this.drive.route.routeIdx];
        this.sendRouteDuration(route.duration);
        let geoLayerGroup: L.LayerGroup = new L.LayerGroup();
        let color = this.colors[Math.floor(Math.random() * 10)];
        for (let leg of route['legs']) {
          for (let step of leg['steps']) {
            let routeLayer = L.geoJSON(step.geometry);
            routeLayer.setStyle({ color: `#${color}` });
            routeLayer.addTo(geoLayerGroup);
          }
        }
        this.routeLayers = [...this.routeLayers, geoLayerGroup];
        this.mainGroup = [...this.mainGroup, ...this.routeLayers];

        const driver: DriverDTO = this.drive.driver;

        const marker = L.marker([driver.location.latitude, driver.location.longitude], {
            icon: this.icon,
            riseOnHover: true,
          }).bindTooltip(
            this.buildTooltipContent(driver),
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

  private buildTooltipContent(driver: DriverDTO) {
    let availability: string = '';
    if (driver.available) {
      availability =
        '<div style="font-family: Arial; color:green">Available</div>';
    } else {
      availability =
        '<div style="font-family: Arial; color:red">NOT available</div>';
    }
    return '<div><div style="font-family: Arial;">' +
      driver.name +
      ' ' +
      driver.surname +
      '</div>' +
      availability +
      '</div>'
  }

  sendRouteDuration(duration: number) {
    this.getDurationEvent.emit(Math.round(duration / 60));
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.initializeWebSocketConnection();
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
