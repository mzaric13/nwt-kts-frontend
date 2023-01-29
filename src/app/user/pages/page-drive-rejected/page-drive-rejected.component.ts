import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from '../../../shared/services/drive.service';

@Component({
  selector: 'app-page-drive-rejected',
  templateUrl: './page-drive-rejected.component.html',
  styleUrls: ['./page-drive-rejected.component.css']
})
export class PageDriveRejectedComponent implements OnInit {

  constructor(private readonly driveService: DriveService,
  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.driveService.rejectDriveConsent(params['tempDriveId'], params['passengerId']).subscribe({
        next: () => {
          
        }
      })
    })
  }

}
