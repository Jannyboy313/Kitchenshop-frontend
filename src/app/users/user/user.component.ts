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
  deleteIsLoading: boolean = false
  roleIsLoading: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.deleteIsLoading = true;
    this.usersService.deleteUser(this.user)
      .subscribe({
        next: () => {
          this.deleteIsLoading = false;

        },
        error: () => {
          this.deleteIsLoading = false;

        }
      })
  }

  setRole() {
    this.usersService.setRole(this.user);
  }

  isAdmin() {
    if (this.user.role === 'admin') {
      return true;
    }
    return false;
  }

}
