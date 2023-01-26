import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnsweredDriverDataCreationDTO } from 'src/app/models/answered-driver-data-creation-dto';
import { DriverDataDTO } from 'src/app/models/driver-data-dto';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-driver-data-change',
  templateUrl: './modal-driver-data-change.component.html',
  styleUrls: ['./modal-driver-data-change.component.css']
})
export class ModalDriverDataChangeComponent implements OnInit {

  @Input() driverData!: DriverDataDTO;

  @Output() modalIsClosed = new EventEmitter();

  @Output() driverDataAnswered = new EventEmitter<DriverDataDTO>();
  
  displayStyle = "none";

  constructor(
    private adminService: AdminService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.displayStyle = "block";
  }

  answer(accepted : boolean){
    let answeredDriverDataCreationDTO : AnsweredDriverDataCreationDTO = {
      driverDataId : this.driverData.id,
      isApproved : accepted
    }
    this.adminService.answerDataChangeRequest(answeredDriverDataCreationDTO).subscribe(data => {
      Swal.fire({
        icon: 'success',
        position: 'center',
        title: 'You have successfully answered driver data change request with ID ' + data.id + '.',
        showConfirmButton: false,
        timer: 3000
      })
      this.driverDataAnswered.emit(data);
      this.closeModal();
    })
  }

  closeModal(){
    this.modalIsClosed.emit();
  }
  

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/answer-driver-data-changes'])
  }

}
