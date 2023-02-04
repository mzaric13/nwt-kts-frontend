import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DriveDTO } from '../../models/drive-dto';
import { PassengerDTO } from '../../models/passenger-dto';
import { PointCreationDTO } from '../../models/point-creation-dto';
import { RouteApi, RouteApiDTO } from '../../models/route-api-dto';
import { RouteDTO } from '../../models/route-dto';
import { GeocodeService } from '../../services/geocode.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-modal-map-history-view',
  templateUrl: './modal-map-history-view.component.html',
  styleUrls: ['./modal-map-history-view.component.css']
})
export class ModalMapHistoryViewComponent implements OnInit, OnChanges {

  @Input() drive!: DriveDTO;
  @Input() passenger!: PassengerDTO;
  @Output() modalIsClosed = new EventEmitter();

  routes: RouteApi[] = [];
  waypoints: PointCreationDTO[] = [];
  loggedPerson!: string;
  displayStyle = "none";
  isFavorite: boolean = false;
  @Output() changeFavoriteRouteEvent = new EventEmitter();

  constructor(private geocodeService: GeocodeService, private router: Router, private tokenService: TokenService) { }

  public closeModal() {
    this.modalIsClosed.emit();
  }

  ngOnInit(): void {
    this.displayStyle = "block";
    this.geocodeService.getRoutes(this.drive.route.waypoints).subscribe((data) => {
      const routes: RouteApiDTO = data as RouteApiDTO;
      this.routes.push(routes.routes[this.drive.route.routeIdx]);
      this.waypoints = this.drive.route.waypoints;
    });
    if (this.tokenService.getRole() === "ROLE_ADMIN")
    {
      this.loggedPerson = "admin";
    }
    else if (this.tokenService.getRole() === "ROLE_PASSENGER")
    {
      this.loggedPerson = "passenger";

    }
    //driver
    else
    {
      this.loggedPerson = "driver";
    }

  }

  public selectRouteAgain(route: RouteDTO) {
    this.closeModal();
    this.router.navigate(['/user/customize-ride'], { state: { data: route } });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const passengerChange = changes['passenger'];
    if (passengerChange) {
      const passenger: PassengerDTO = passengerChange.currentValue;
      if (passenger) {
        let foundFavorite: boolean = false;
        for (let favoriteRoute of passenger.favoriteRoutes) {
          if (favoriteRoute.id === this.drive.route.id) {
            this.isFavorite = true;
            foundFavorite = true;
          }
        }

        if (!foundFavorite) {
          this.isFavorite = false;
        }
      }
    }
  }

  changeFavorite(isFavorite: boolean) {
    this.changeFavoriteRouteEvent.emit(isFavorite);
  }

}
