import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.css']
})
export class NavigationbarComponent implements OnInit {
  isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

  // TODO Get permission from authservice
  isAdmin() {
    return false;
  }

  // TODO Get login from authservice
  isLoggedIn() {
    return false;
  }

  logout() {
    // TODO logout user/admin
  }

}
