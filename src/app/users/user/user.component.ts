import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  users: User[];

  constructor() { }

  ngOnInit(): void {
  }

  deleteUser(user) {

  }

  setRole(role) {

  }

  isAdmin(user) {
    if (user.role === 'admin') {
      return true;
    }
    return false;
  }

}
