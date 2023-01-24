import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/services/drive.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-drive-accepted',
  templateUrl: './page-drive-accepted.component.html',
  styleUrls: ['./page-drive-accepted.component.css']
})
export class PageDriveAcceptedComponent implements OnInit {

  constructor(private readonly driveService: DriveService,
    private route: ActivatedRoute) { }
  
  okStatus: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.driveService.acceptDriveConsent(params['tempDriveId']).subscribe({
        next: () => {
          this.okStatus = true;
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'error!',
            text: err.error.apierror.message,
          });
        }
      })
    })
  }

}
