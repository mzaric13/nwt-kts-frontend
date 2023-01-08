import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RouteDTO } from 'src/app/models/route-dto';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-page-customize-ride',
  templateUrl: './page-customize-ride.component.html',
  styleUrls: ['./page-customize-ride.component.css'],
})
export class PageCustomizeRideComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeService.getRouteById(params['id']).subscribe({
        next: (routeDTO: RouteDTO) => {
          console.log(routeDTO);
        },
      });
    });
  }
}
