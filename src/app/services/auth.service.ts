import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private user: string;
  private role: string;

  constructor(private http: HttpClient, private router: Router,) {}

  login({ username, password }) : boolean {
    let isSuccess: boolean;
    this.http.post<any>(environment.apiUrl + "login",
    {"username": username, "password": password})
      .subscribe(
        (value) => {
          this.loginUser(username, value.role, value.token);
          this.router.navigate(['/formSelection']);
          if (this.getUser().role === 'admin'){
            this.router.navigate(['/adminforms']);
          }
          isSuccess = true;
        },
        response => {
          console.log("errr", response);
          isSuccess = false;
        }
      );
      return isSuccess
  }


  getUser() {
    return {"username": this.user, "role": this.role};
  }

  logout() {
    this.user = null;
    this.role = null;
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private loginUser(username: string, role: string, jwt: string) {
    this.user = username;
    this.role = role;
    this.storeJwtToken(jwt);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

}