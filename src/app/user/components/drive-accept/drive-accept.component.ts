import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-drive-accept',
  templateUrl: './drive-accept.component.html',
  styleUrls: ['./drive-accept.component.css']
})
export class DriveAcceptComponent implements OnInit {

  @Input() okStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
