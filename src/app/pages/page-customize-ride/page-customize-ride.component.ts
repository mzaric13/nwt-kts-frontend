import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { RouteDTO } from 'src/app/models/route-dto';
import { TagDTO } from 'src/app/models/tag-dto';
import { PassengerService } from 'src/app/services/passenger.service';
import { RouteService } from 'src/app/services/route.service';
import { TagService } from 'src/app/services/tag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-customize-ride',
  templateUrl: './page-customize-ride.component.html',
  styleUrls: ['./page-customize-ride.component.css'],
})
export class PageCustomizeRideComponent implements OnInit {
  @Input() loggedPassenger!: PassengerDTO;

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
    private tagService: TagService,
    private passengerService: PassengerService
  ) {}

  routeDTO!: RouteDTO;
  tags: TagDTO[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.routeService.getRouteById(params['id']).subscribe({
        next: (routeDTO: RouteDTO) => {
          this.routeDTO = routeDTO;
        },
      });

      this.tagService.getAllTags().subscribe({
        next: (tags: TagDTO[]) => {
          this.tags = tags;
        },
      });
    });

    this.passengerService.getLoggedPassenger().subscribe({
      next: (passenger: PassengerDTO) => {
        this.loggedPassenger = passenger;
        console.log(this.loggedPassenger);
      },
    });
  }

  changeFavoriteRoute(isFavorite: boolean) {
    if (isFavorite) {
      this.passengerService.addFavoriteRoute(this.routeDTO).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Route successfully added to favorites!',
          });
        },
      });
    } else {
      this.passengerService.removeFavoriteRoute(this.routeDTO.id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Route successfully removed from favorites!',
          });
        },
      });
    }
  }
}
