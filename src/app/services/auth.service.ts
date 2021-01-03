import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { User } from '../models/user.model';

import { PreviousRouteService } from './previous-route.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private user: User = null;

  constructor(private http: HttpClient, private router: Router, private previousRouteService: PreviousRouteService) {}

  login({ email, password }) : boolean {
    let isSuccess: boolean;
    this.http.post<any>(environment.apiUrl + "/login",
    {"email": email, "password": password})
      .subscribe(
        (value) => {
          this.loginUser(new User().deserialize(value), value.token);
          this.routeUser();
          isSuccess = true;
        },
        response => {
          console.log("errr", response);
          isSuccess = false;
        }
      );
      return isSuccess
  }

  routeUser() {
    if (this.getUser().role === 'admin'){
      this.router.navigate(['/home']); // TODO Change to admin route
    } else if(this.isAtCheckout()) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  getUser(): User {
    return this.user;
  }

  isAdmin() {
    if (this.user.role === 'admin')
      return true;
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private loginUser(user: User, jwt: string) {
    this.user = user;
    this.storeJwtToken(jwt);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private isAtCheckout() {
    if(
      this.previousRouteService.getHistoryUrl(1) === '/cart' ||
      this.previousRouteService.getHistoryUrl(3) === '/cart' &&
      this.previousRouteService.getHistoryUrl(1) === '/register'
      )
      return true;
  }

}