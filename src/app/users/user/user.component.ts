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
  isError: boolean = false;
  errorMessage: string = "Error not known"
  deleteIsLoading: boolean = false
  roleIsLoading: boolean = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  deleteUser() {
    this.isError = false;
    this.deleteIsLoading = true;
    this.usersService.deleteUser(this.user)
      .subscribe({
        next: () => {
          this.deleteIsLoading = false;

        },
        error: (error) => {
          this.isError = true;
          this.errorMessage = error.error.error;
          this.deleteIsLoading = false;

        }
      })
  }

  setRole(role) {
    console.log("This is the user: ", this.user)
    console.log("This is the role: ", role)
    this.isError = false;
    let copyUser = this.user
    copyUser.role = role;
    this.usersService.updateUser(copyUser)
      .subscribe({
        next: () => {
          this.user = copyUser;
          this.roleIsLoading = false
          this.usersService.setRole(this.user);
        },
        error: (error) => {
          this.isError = true;
          this.errorMessage = error.error.error;
          this.roleIsLoading = false;
        }
      })
  }

  isAdmin() {
    if (this.user.role === 'admin') {
      return true;
    }
    return false;
  }

}
