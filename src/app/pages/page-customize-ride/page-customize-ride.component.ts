import { Component, Input, OnInit, Type } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import CreateRide from 'src/app/models/create-ride';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { RouteDTO } from 'src/app/models/route-dto';
import { TagDTO } from 'src/app/models/tag-dto';
import TempDriveDTO from 'src/app/models/temp-drive-dto';
import { TypeDTO } from 'src/app/models/type-dto';
import { DriveService } from 'src/app/services/drive.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { RouteService } from 'src/app/services/route.service';
import { TagService } from 'src/app/services/tag.service';
import { VehicleService } from 'src/app/services/vehicle.service';
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
    private passengerService: PassengerService,
    private driveService: DriveService,
    private vehicleService: VehicleService,
    private router: Router,
  ) {}

  routeDTO!: RouteDTO;
  tags: TagDTO[] = [];
  vehicleTypes: TypeDTO[] = [];

  ngOnInit(): void {
    this.routeDTO = history.state.data;
    this.tagService.getAllTags().subscribe({
        next: (tags: TagDTO[]) => {
          this.tags = tags;
        },
      });

    this.passengerService.getLoggedPassenger().subscribe({
      next: (passenger: PassengerDTO) => {
        this.loggedPassenger = passenger;
      },
    });

    this.vehicleService.getVehicleTypes().subscribe({
      next: (vehicleTypes: TypeDTO[]) => {
        this.vehicleTypes = vehicleTypes;
      }
    })
  }

  changeFavoriteRoute(isFavorite: boolean) {
    if (isFavorite) {
      this.passengerService.addFavoriteRoute(this.routeDTO).subscribe({
        next: (favoriteRoute: RouteDTO) => {
          this.routeDTO = favoriteRoute;
          console.log(this.routeDTO);
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

  createRide(createRide: CreateRide) {
    createRide.passengers.push(this.loggedPassenger.email);
    const tempDrive: TempDriveDTO = {
      startDate: createRide.time,
      price: 150 + this.routeDTO.length * 120,
      length: this.routeDTO.length,
      tags: createRide.tags,
      emails: createRide.passengers,
      routeDTO: this.routeDTO,
      typeDTO: createRide.typeDTO,
    }

    this.driveService.createTempDrive(tempDrive).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Ride successfully ordered!',
        });
        this.router.navigate(['/home-passenger']);
      },
      error: (err) => {
        createRide.passengers.splice(createRide.passengers.length - 1, 1);
        console.log(err);
        if (err.status === 404) {
          Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.error.apierror.debugMessage,
        });
        }
      }
    })
  }
}
