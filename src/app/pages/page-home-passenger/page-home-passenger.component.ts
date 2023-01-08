import { Component, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PointCreationDTO } from 'src/app/models/point-creation-dto';
import { RouteCreationDTO } from 'src/app/models/route-creation-dto';
import { RouteDTO } from 'src/app/models/route-dto';
import { DriverService } from 'src/app/services/driver.service';
import { GeocodeService } from 'src/app/services/geocode.service';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-home-passenger',
  templateUrl: './page-home-passenger.component.html',
  styleUrls: ['./page-home-passenger.component.css'],
})
export class PageHomePassengerComponent implements OnInit {
  constructor(
    private readonly geocodeService: GeocodeService,
    private readonly driverService: DriverService,
    private readonly routeService: RouteService,
    private readonly router: Router
  ) {}

  rideAddresses: number[][] = [];
  drivers: DriverDTO[] = [];
  routeWaypoints: PointCreationDTO[] = [];
  routeName: string = '';
  estimatedTime: number = 0;
  distance: number = 0;
  estimatedCost: number = 0;
  startPoint!: PointCreationDTO;
  endPoint!: PointCreationDTO;

  ngOnInit(): void {
    try {
      this.driverService.getAllDrivers().subscribe({
        next: (drivers: DriverDTO[]) => {
          this.drivers = drivers;
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async makeRoute(routes: string[]) {
    this.routeName = routes.join('-');
    const driveAddresses: number[][] = [];
    for (let route of routes) {
      const routeResult = await this.geocodeService.getGeocodes(route);
      try {
        driveAddresses.push([routeResult[0].y, routeResult[0].x]);
      } catch (e) {
        const text = 'Location ' + route + " doesn't exist";
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text,
        });
      }
    }
    this.startPoint = {
      latitude: driveAddresses[0][0],
      longitude: driveAddresses[0][1],
    };
    this.endPoint = {
      latitude: driveAddresses[driveAddresses.length - 1][0],
      longitude: driveAddresses[driveAddresses.length - 1][1],
    };
    this.rideAddresses = driveAddresses;
  }

  async customizeRide() {
    const routeCreationDTO: RouteCreationDTO = {
      routeName: this.routeName,
      startPoint: this.startPoint,
      endPoint: this.endPoint,
      expectedTime: this.estimatedTime,
      length: this.distance,
      routePath: this.routeWaypoints,
    };
    this.routeService.addRoute(routeCreationDTO).subscribe({
      next: (routeDTO: RouteDTO) => {
        this.router.navigateByUrl(`/customize-ride/${routeDTO.id}`);
      },
    });
  }

  getEstimatedTime(time: number) {
    this.estimatedTime = time;
  }

  getEstimatedCost(distance: number) {
    this.distance = distance;
    this.estimatedCost = 150 + distance * 120;
  }

  getWaypoints(waypoints: PointCreationDTO[]) {
    this.routeWaypoints = waypoints;
  }
}
