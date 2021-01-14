import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  usersObservable$: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.usersObservable$ = this.usersService.getUsers();
        this.usersObservable$.subscribe(updatedUsers => {
          this.users = updatedUsers;
        })
      })
  }

}
