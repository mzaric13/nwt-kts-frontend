import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.isLoggedIn()) {
      let role = this.tokenService.getRole();
      if (role === 'ROLE_PASSENGER') {
        this.router.navigate(['/user/home-passenger']);
      } else if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/user/admin-profile']);
      } else if (role === 'ROLE_DRIVER') {
        this.router.navigate(['/user/driver-profile']);
      }
      return false;
    }
    return true;
  }

}
