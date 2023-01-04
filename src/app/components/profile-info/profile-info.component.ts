import { Component, OnInit, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() imgSrc = '../../../assets/default.jpg';

  @Input() name = 'Name Surname';

  constructor() { }

  ngOnInit(): void {
  }

}
