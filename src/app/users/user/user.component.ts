import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  deleteUser() {

  }

  setRole() {

  }

  isAdmin() {
    if (this.user.role === 'admin') {
      return true;
    }
    return false;
  }

}
