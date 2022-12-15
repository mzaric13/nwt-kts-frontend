import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  role : string | null | undefined;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.role = this.tokenService.getRole();
  }

}
