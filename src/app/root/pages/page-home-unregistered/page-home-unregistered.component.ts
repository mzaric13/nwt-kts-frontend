import { Component, OnInit } from '@angular/core';
import { DriverDTO } from '../../../shared/models/driver-dto';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { PointCreationDTO } from '../../../shared/models/point-creation-dto';
import { DriverService } from '../../../shared/services/driver.service';
import { GeocodeService } from '../../../shared/services/geocode.service';
import Swal from 'sweetalert2';
import { RouteApi, RouteApiDTO } from 'src/app/shared/models/route-api-dto';

@Component({
  selector: 'app-page-home-unregistered',
  templateUrl: './page-home-unregistered.component.html',
  styleUrls: ['./page-home-unregistered.component.css'],
})
export class PageHomeUnregisteredComponent implements OnInit {
  constructor(
    private readonly geocodeService: GeocodeService,
    private readonly driverService: DriverService,
  ) {}

  routeWaypoints: PointCreationDTO[] = [];
  drivers: DriverDTO[] = [];
  estimatedTime: number = 0;
  estimatedCost: number = 0;
  routes: RouteApi[] = [];

  loggedPassenger!: PassengerDTO;

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
    const waypoints: PointCreationDTO[] = [];
    for (let route of routes) {
      const routeResult = await this.geocodeService.getGeocodes(route);
      try {
        waypoints.push({ latitude: routeResult[0].y, longitude: routeResult[0].x });
      } catch (e) {
        const text = 'Location ' + route + " doesn't exist";
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text,
        });
      }
    }
    this.geocodeService.getRoutes(waypoints).subscribe({
      next: (response) => {
        const routes = response as RouteApiDTO;
        console.log(routes)
        this.routes = routes.routes;
        this.routeWaypoints = waypoints;
      }
    })
  }

  getEstimatedTime(time: number) {
    this.estimatedTime = time;
  }

  getEstimatedCost(distance: number) {
    this.estimatedCost = 1.25 + distance * 1;
  }
}
