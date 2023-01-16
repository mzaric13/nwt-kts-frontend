import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DriveDTO } from 'src/app/models/drive-dto';
import { PointCreationDTO } from 'src/app/models/point-creation-dto';
import { RouteDTO } from 'src/app/models/route-dto';
import { GeocodeService } from 'src/app/services/geocode.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-modal-map-history-view',
  templateUrl: './modal-map-history-view.component.html',
  styleUrls: ['./modal-map-history-view.component.css']
})
export class ModalMapHistoryViewComponent implements OnInit {

  @Input() drive!: DriveDTO;
  @Output() modalIsClosed = new EventEmitter();

  routes: any[] = [];
  waypoints: PointCreationDTO[] = [];
  loggedPerson!: string;
  displayStyle = "none";

  constructor(private geocodeService: GeocodeService, private router: Router, private tokenService: TokenService) { }

  public closeModal() {
    this.modalIsClosed.emit();
  }

  ngOnInit(): void {
    this.displayStyle = "block";
    this.geocodeService.getRoutes(this.drive.route.waypoints).subscribe((data:any) => {
      this.routes.push(data.routes[this.drive.route.routeIdx]);
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
    this.router.navigate(['/customize-ride'], { state: { data: route } });
  }

}
