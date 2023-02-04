import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRoles: string = route.data['expectedRoles'];
    const token = this.tokenService.getToken();

    if (token === null) {
      this.router.navigate(['/']);
      return false;
    }

    const roles: string[] = expectedRoles.split("|", 3);
    const role = this.tokenService.getRole();

    if (role === null) {
      this.router.navigate(['/']);
      return false;
    }else {
      if (roles.indexOf(role) === -1) {
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
  
}
