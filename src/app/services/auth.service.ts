import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl + 'Auth/';
  jwtHelper = new JwtHelperService();
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  /// <summary>
  /// This method is used to login the user.
  /// </summary>

  login(user: any): Observable<any> {
    return this.httpClient
      .post(this.baseUrl + 'login', user, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            console.log(user);
            this.cookieService.set(
              'token',
              user.token,
              15,
              '/',
              '',
              true,
              'Strict'
            );
          }
        })
      );
  }

  register(user: any): Observable<user> {
    return this.httpClient.post<user>(this.baseUrl + 'register', user);
  }

  loggedInUser() {
    const token = this.cookieService.get('token');
    if (token === null || token === undefined) return false;
    return !this.jwtHelper.isTokenExpired(token);
  }

  
}
