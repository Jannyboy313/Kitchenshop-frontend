import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { AuthService } from './auth.service';

import { User } from '../models/user.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  register(user: User, address: Address) : any {
    return this.http.post<any>(environment.apiUrl + "/register",
    {"user": user, "address": address});
  }
}