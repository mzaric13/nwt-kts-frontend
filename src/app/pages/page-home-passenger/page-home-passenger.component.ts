import { Component, OnInit } from '@angular/core';
import { DriverDTO } from 'src/app/models/driver-dto';
import { PointCreationDTO } from 'src/app/models/point-creation-dto';
import { RouteDTO } from 'src/app/models/route-dto';
import { DriverService } from 'src/app/services/driver.service';
import { GeocodeService } from 'src/app/services/geocode.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PassengerService } from 'src/app/services/passenger.service';
import { PassengerDTO } from 'src/app/models/passenger-dto';

@Component({
  selector: 'app-page-home-passenger',
  templateUrl: './page-home-passenger.component.html',
  styleUrls: ['./page-home-passenger.component.css'],
})
export class PageHomePassengerComponent implements OnInit {
  constructor(
    private readonly geocodeService: GeocodeService,
    private readonly driverService: DriverService,
    private readonly passengerService: PassengerService,
    private readonly router: Router
  ) { }
  
  drivers: DriverDTO[] = [];
  routeWaypoints: PointCreationDTO[] = [];
  routeName: string = '';
  estimatedTime: number = 0;
  distance: number = 0;
  estimatedCost: number = 0;
  routeIdx!: number;

  routes: any = [];

  loggedPassenger!: PassengerDTO;

  ngOnInit(): void {
    try {
      this.driverService.getAllDrivers().subscribe({
        next: (drivers: DriverDTO[]) => {
          this.drivers = drivers;
        },
      });

      this.passengerService.getLoggedPassenger().subscribe({
      next: (passenger: PassengerDTO) => {
        this.loggedPassenger = passenger;
        console.log(this.loggedPassenger);
      },
    });
    } catch (e) {
      console.log(e);
    }
  }

  async makeRoute(routes: string[]) {
    this.routeName = routes.join('-');
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
      next: (routes: any) => {
        this.routes = routes.routes;
        this.routeWaypoints = waypoints;
      }
    })
  }

  customizeRide() {
    const routeDTO: RouteDTO = {
      id: 0,
      routeName: this.routeName,
      expectedTime: this.estimatedTime,
      length: this.distance,
      waypoints: this.routeWaypoints,
      routeIdx: this.routeIdx,
    };
    this.router.navigate(['/customize-ride'], { state: { data: routeDTO } });
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

  getRouteIdx(routeIdx: number) {
    this.routeIdx = routeIdx;
  }
}
