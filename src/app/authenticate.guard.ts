import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateGuard implements CanActivate {
  jwtHelper = new JwtHelperService();
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this.cookieService.get('token') == '' ||
      this.jwtHelper.isTokenExpired(this.cookieService.get('token'))
    ) {
      console.log('Not Authenticated');
      this.router.navigate(['/login']);
      return false;
    }
    console.log('Authenticated');
    return true;
  }
}
