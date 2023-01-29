import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { RouteDTO } from '../../../shared/models/route-dto';
import { RouteSummaryDTO } from '../../../shared/models/route-summary-dto';

@Component({
  selector: 'app-route-summary',
  templateUrl: './route-summary.component.html',
  styleUrls: ['./route-summary.component.css'],
})
export class RouteSummaryComponent implements OnInit, OnChanges {
  @Input() route!: RouteDTO;
  @Input() passenger!: PassengerDTO;
  @Output() changeFavoriteRouteEvent = new EventEmitter();

  tableData: RouteSummaryDTO[] = [];
  displayedColumns: string[] = ['name', 'expected time', 'distance'];
  routeLoaded: boolean = false;

  isFavorite: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const routeChange = changes['route'];
    if (routeChange && !this.routeLoaded) {
      const currentRoute: RouteDTO = routeChange.currentValue;
      if (currentRoute) {
        this.routeLoaded = true;
        let routeName = currentRoute.routeName;
        let routeLocations = routeName.split('-');
        let routeLocationsShortened: string[] = [];
        for (let routeLocation of routeLocations) {
          routeLocation = routeLocation.split(',')[0];
          routeLocationsShortened.push(routeLocation);
        }
        routeName = routeLocationsShortened.join('-');
        this.tableData.push({
          routeName,
          expectedTime: currentRoute.expectedTime + 'min',
          length: currentRoute.length + 'km',
        });
      }
    }

    const passengerChange = changes['passenger'];
    if (passengerChange) {
      const passenger: PassengerDTO = passengerChange.currentValue;
      if (passenger) {
        let foundFavorite: boolean = false;
        for (let favoriteRoute of passenger.favoriteRoutes) {
          if (favoriteRoute.id === this.route.id) {
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

  ngOnInit(): void {}
}
