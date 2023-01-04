import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css'],
})
export class RouteDetailsComponent implements OnInit {
  constructor() {}

  @Input() estimatedTime: number = 0;

  ngOnInit(): void {}
}
