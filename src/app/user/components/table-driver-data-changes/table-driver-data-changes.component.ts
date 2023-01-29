import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DriverDataDTO } from '../../../shared/models/driver-data-dto';
import { RequestPage } from '../../../shared/models/request-page';
import { RequestPageObject } from '../../../shared/models/request-page-object';
import { AdminService } from '../../../shared/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-driver-data-changes',
  templateUrl: './table-driver-data-changes.component.html',
  styleUrls: ['./table-driver-data-changes.component.css']
})
export class TableDriverDataChangesComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() answeredDriverDataDTO!: DriverDataDTO;

  @Output() showModalButtonPressedEvent = new EventEmitter<DriverDataDTO>();

  unansweredDriverData : DriverDataDTO[] = [];
  loading: boolean = true;
  totalElements: number | undefined;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'fullName', 'dateOfRequest', 'details'];

  constructor(private adminService: AdminService, private router: Router) {
    
   }

  ngOnInit(): void {
    const request: RequestPage = {
      page: 0,
      size: 2
    }
    this.getDriverData(request);
  }

  ngOnChanges() {
    const request: RequestPage = {
      page: 0,
      size: 2
    }
    this.getDriverData(request);
  }

  private getDriverData(request: RequestPage) {
    this.adminService.getUnansweredDriverDataRequests(request).subscribe(data => {
      this.checkDriverDataLength(data);
      this.setDriverData(data);
    });
  }

  private checkDriverDataLength(data: RequestPageObject) {
    if (data.driverData.length === 0) {
      Swal.fire({
        icon: 'info',
        position: 'center',
        title: 'There are currently no active driver data change requests.',
        showConfirmButton: false,
        timer: 3000
      })
      this.navigate();
    }
  }

  private setDriverData(data: RequestPageObject) {
    this.loading = false;
    this.unansweredDriverData = data.driverData;
    this.unansweredDriverData.length = data.totalItems;

    this.dataSource = new MatTableDataSource<any>(this.unansweredDriverData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private setNextDriverData(data: RequestPageObject, request: RequestPage) {
    this.loading = false;
    this.unansweredDriverData.length = request.page * request.size;
    this.unansweredDriverData.push(...data.driverData);
    this.unansweredDriverData.length = data.totalItems;

    this.dataSource = new MatTableDataSource<any>(this.unansweredDriverData);
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getNextDriverData(request: RequestPage) {
    this.adminService.getUnansweredDriverDataRequests(request).subscribe(data => {
      this.setNextDriverData(data, request);
    });
  }

  public nextPage(event: PageEvent) {
    const request: RequestPage = {
      page: event.pageIndex,
      size: event.pageSize
    }
    this.getNextDriverData(request);
  }

  public showModal(request : DriverDataDTO){
    this.showModalButtonPressedEvent.emit(request);
  }

  private navigate() {
    this.router.navigate(['/admin-profile'])
  }
}
