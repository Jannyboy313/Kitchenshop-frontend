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

  postLogin({ email, password }) {
    return this.http.post<any>(environment.apiUrl + "/login",
    {"email": email, "password": password});
  }

  loginUser(user: User, jwt: string) {
    console.log("This is the user: ", user);
    this.user = user;
    this.storeJwtToken(jwt);
    this.routeUser();
  }

  getUser(): User {
    return this.user;
  }

  isAdmin() {
    if (!this.user) {
      return false;
    }else if (this.user.role === 'admin') {
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken() && this.user
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private routeUser() {
    if (this.getUser().role === 'admin'){
      this.router.navigate(['/home']); // TODO Change to admin route
    } else if(this.isAtCheckout()) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/home']);
    }
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