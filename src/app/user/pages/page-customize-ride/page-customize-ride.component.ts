import { Component, Input, OnInit, Type } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import CreateRide from '../../../shared/models/create-ride';
import { PassengerDTO } from '../../../shared/models/passenger-dto';
import { RouteDTO } from '../../../shared/models/route-dto';
import { TagDTO } from '../../../shared/models/tag-dto';
import TempDriveDTO from '../../../shared/models/temp-drive-dto';
import { TypeDTO } from '../../../shared/models/type-dto';
import { DriveService } from '../../../shared/services/drive.service';
import { PassengerService } from '../../../shared/services/passenger.service';
import { TagService } from '../../services/tag.service';
import { VehicleService } from '../../../shared/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-customize-ride',
  templateUrl: './page-customize-ride.component.html',
  styleUrls: ['./page-customize-ride.component.css'],
})
export class PageCustomizeRideComponent implements OnInit {
  loggedPassenger!: PassengerDTO;

  constructor(
    private route: ActivatedRoute,
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
      price: 1.25 + this.routeDTO.length * 1,
      length: this.routeDTO.length,
      tags: createRide.tags,
      emails: createRide.passengers,
      routeDTO: this.routeDTO,
      typeDTO: createRide.typeDTO,
    }

    this.driveService.createTempDrive(tempDrive).subscribe({
      next: (tempDriveDTO: TempDriveDTO) => {
        const currentDate = new Date();
        const currentTime = currentDate.getTime() / 60000;
        const startTime = tempDrive.startDate.getTime() / 60000;
        const difference = Math.round(startTime - currentTime);
        if (difference >= 20) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You and other passengers will receive notifications to alert you of your scheduled drive!' +
              ' Thank you for using our services!',
            timer: 4000,
          })
            .then(() => {
            this.router.navigate(['/user/home-passenger'], { replaceUrl: true});
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You and other passengers will receive an email where you will give your consent for the ride!' +
              ' Thank you for using our services!',
            timer: 4000,
          });
          this.driveService.sendConfirmationEmails(tempDriveDTO.id!).subscribe({
            next: () => {
              this.router.navigate(['/user/home-passenger'], { replaceUrl: true});
            }
          });
        }
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
