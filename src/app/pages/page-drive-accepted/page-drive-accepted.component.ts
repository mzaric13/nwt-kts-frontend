import { Component, OnInit } from '@angular/core';
import { DriveService } from 'src/app/services/drive.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-drive-accepted',
  templateUrl: './page-drive-accepted.component.html',
  styleUrls: ['./page-drive-accepted.component.css']
})
export class PageDriveAcceptedComponent implements OnInit {

  constructor(private readonly driveService: DriveService,
  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.driveService.acceptDriveConsent(params['tempDriveId']).subscribe({
        next: () => {
          
        }
      })
    })
  }

}
