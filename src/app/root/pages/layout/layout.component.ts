import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public role = '';

  constructor(private tokenService: TokenService) { 
  }

  ngOnInit(): void {
    let r = this.tokenService.getRole();
    console.log(r);
    if (r !== null) this.role = r as string;
  }

}
