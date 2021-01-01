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

  login({ email, password }) : boolean {
    let isSuccess: boolean;
    this.http.post<any>(environment.apiUrl + "/login",
    {"email": email, "password": password})
      .subscribe(
        (value) => {
          this.loginUser(email, value.role, value.token);
          this.router.navigate(['/home']);
          if (this.getUser().role === 'admin'){
            this.router.navigate(['/admin']);
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

  isAdmin() {
    if (this.role === 'admin')
      return true;
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