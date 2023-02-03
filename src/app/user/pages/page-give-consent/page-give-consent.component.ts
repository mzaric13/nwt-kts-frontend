import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from 'src/app/shared/services/drive.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-give-consent',
  templateUrl: './page-give-consent.component.html',
  styleUrls: ['./page-give-consent.component.css']
})
export class PageGiveConsentComponent implements OnInit {

  driveAccepted: boolean = false;
  okStatus: boolean = false;

  constructor(
    private readonly driveService: DriveService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: params => {
        console.log(params);
        this.driveAccepted = params['driveAccepted'] === 'true';
        console.log(this.driveAccepted);
        if (this.driveAccepted) {
          console.log('potvrdfa')
          this.driveService.acceptDriveConsent(params['tempDriveId'], params['passengerId']).subscribe({
            next: () => {
              this.okStatus = true;
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'error!',
                text: err.error.apierror.message,
              });
            }
          });
        } else {
          this.driveService.rejectDriveConsent(params['tempDriveId'], params['passengerId']).subscribe({
            next: () => { 
              this.okStatus = true;
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'error!',
                text: err.error.apierror.message,
              });
            }
          });
        }
      }
    });
  }

}
