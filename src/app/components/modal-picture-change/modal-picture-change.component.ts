import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerDTO } from 'src/app/models/passenger-dto';
import { ProfilePictureCreationDTO } from 'src/app/models/profile-picture-creation-dto';
import { PassengerService } from 'src/app/services/passenger.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-picture-change',
  templateUrl: './modal-picture-change.component.html',
  styleUrls: ['./modal-picture-change.component.css']
})
export class ModalPictureChangeComponent implements OnInit {

  @Input() passenger!: PassengerDTO;

  @Output() passengerChange: EventEmitter<PassengerDTO> = new EventEmitter<PassengerDTO>();

  @Output() profilePictureChangeModalClosed = new EventEmitter();

  newProfilePicture!: string;

  displayStyle = "none";

  fileName =  '';

  constructor(
    private passengerService: PassengerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileName = target.files[0].name;
    }
  }

  changeProfilePicture() {
    let profilePictureCreationDTO : ProfilePictureCreationDTO = {
      email : this.passenger.email,
      profilePicturePath : this.fileName
    }
    this.passengerService.changeProfilePicture(profilePictureCreationDTO).subscribe(data => {
      this.passenger.profilePicture = this.fileName;
      Swal.fire({
        icon: 'success',
        position: 'center',
        title:  data.name + ' ' + data.surname + ', you have successfully changed your profile picture.',
        showConfirmButton: false,
        timer: 3000
      })
      this.reloadPage();
    },
    error =>{
      Swal.fire({
        icon: 'error',
        position: 'center',
        title: 'An unknown error has occured.',
        showConfirmButton: false,
        timer: 3000
      })
    })
  }

  closeModal() {
    this.profilePictureChangeModalClosed.emit();
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/passenger-profile']);
  }

}
