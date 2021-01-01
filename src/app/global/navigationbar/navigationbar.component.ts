import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
  isCollapsed = true;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

}
