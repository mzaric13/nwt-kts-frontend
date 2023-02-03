import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestPage } from 'src/app/shared/models/request-page';

@Component({
  selector: 'app-chat-table',
  templateUrl: './chat-table.component.html',
  styleUrls: ['./chat-table.component.css']
})
export class ChatTableComponent implements OnInit, OnChanges {

  @ViewChild('paginator') paginator!: MatPaginator;

  @Input() totalItems: number = 0;

  @Input() data: any = [];

  @Input() headerName: string = "";

  @Output() changePageEvent = new EventEmitter<RequestPage>();

  @Output() goToChatEvent = new EventEmitter();


  displayedColumns: string[] = ['profile-picture', 'email', 'name', 'surname'];

  dataSource = new MatTableDataSource<unknown>();

  firstChange: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newDataChange = changes['data'];
    const newTotalItems = changes['totalItems'];
    if (newDataChange.isFirstChange()) {
      this.firstChange = true;
      return;
    }
    if (newDataChange && newTotalItems && this.firstChange) {
      this.data = newDataChange.currentValue;
      this.data.length = newTotalItems.currentValue;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    } else if (newDataChange) {
      this.data = newDataChange.currentValue;
      this.data.length = this.totalItems;
      this.dataSource = new MatTableDataSource<any>(this.data);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
    }
  }

  nextPage(pageEvent: PageEvent) {
    const request: RequestPage = {
      page: pageEvent.pageIndex,
      size: pageEvent.pageSize
    }
    this.changePageEvent.emit(request);
  }

  goToChat(row: unknown) {
    this.goToChatEvent.emit(row);
  }

  getElementImgSrc(element: any) {
    let imgSrc = '../../../../assets/default.jpg';
    if (element.city === null) imgSrc = element.profilePicture;
    else {
      if (element.imageData !== undefined && element.imageData !== null) imgSrc = 'data:image/jpeg;base64,' + element.imageData.imageData;
    }
    return imgSrc;
  }

}
