import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DriveDTO } from 'src/app/models/drive-dto';
import { RequestPage } from 'src/app/models/request-page';
import { DriveService } from 'src/app/services/drive.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})

export class ViewHistoryComponent implements OnInit{

  
  drives: DriveDTO[] = [];
  loading: boolean = true;
  totalElements: number | undefined;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'route', 'price', 'startDate', 'endDate'];

  constructor(private driveService: DriveService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    //zavisi ko je ulogovan
    const request: RequestPage = {
      page: 0,
      size: 2
    }
    this.getDrives(request);
  }

  private getDrives(request: RequestPage) {
    this.driveService.getDrives(request).subscribe(data => {
      this.loading = false;
      this.drives = data.drives;
      this.drives.length = data.totalItems;

      this.dataSource = new MatTableDataSource<any>(this.drives);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  getNextData(request: RequestPage){

    this.driveService.getDrives(request).subscribe(data => {
      this.loading = false;
      this.drives.length = request.page * request.size;
      this.drives.push(...data.drives);
      this.drives.length = data.totalItems;

      this.dataSource = new MatTableDataSource<any>(this.drives);
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  
  }

  public nextPage(event: PageEvent) {

    const request: RequestPage = {
      page: event.pageIndex,
      size: event.pageSize
    }

    //zavisi ko je ulogavan, opet
    this.getNextData(request);
  }



}
