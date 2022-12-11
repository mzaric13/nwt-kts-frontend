import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DriverDataDTO } from 'src/app/models/driver-data-dto';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-driver-data-changes',
  templateUrl: './table-driver-data-changes.component.html',
  styleUrls: ['./table-driver-data-changes.component.css']
})
export class TableDriverDataChangesComponent implements OnInit {

  @Output() showModalButtonPressedEvent = new EventEmitter<DriverDataDTO>();

  unansweredRequests! : DriverDataDTO[]

  constructor(private adminService: AdminService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.adminService.getUnansweredDriverDataRequests().subscribe(data => {
      this.unansweredRequests = data;
      if (this.unansweredRequests.length < 1){
        Swal.fire({
          icon: 'info',
          position: 'center',
          title: 'There are currently no active driver data change requests.',
          showConfirmButton: false,
          timer: 3000
        })
        this.reloadPage();
      }
    })
  }

  showModal(request : DriverDataDTO){
    this.showModalButtonPressedEvent.emit(request);
  }

  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/admin-profile'])
  }
}
