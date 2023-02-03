import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive-reject',
  templateUrl: './drive-reject.component.html',
  styleUrls: ['./drive-reject.component.css']
})
export class DriveRejectComponent implements OnInit {

  @Input() okStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
