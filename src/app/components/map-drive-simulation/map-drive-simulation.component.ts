import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import * as L from 'leaflet';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-map-drive-simulation',
  templateUrl: './map-drive-simulation.component.html',
  styleUrls: ['./map-drive-simulation.component.css']
})
export class MapDriveSimulationComponent implements OnInit, AfterViewInit {

  private icon!: L.DivIcon;
  private routeLayers: L.LayerGroup[] = [];

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }
  
}
