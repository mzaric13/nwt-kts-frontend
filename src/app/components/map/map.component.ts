import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

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

    var icon: L.DivIcon = L.divIcon({
      className: 'position-relative rotate--marker',
      html: '<div><img style="width: 50px;" src="https://www.pngkit.com/png/full/54-544296_red-top-view-clip-art-at-clker-cartoon.png" /></div>',
    });

    L.marker([45.25, 19.85], {
      icon: icon,
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
