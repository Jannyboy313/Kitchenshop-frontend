import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[];
  private usersSubject = new Subject<User[]>();

  constructor() {
    this.usersSubject.next([]);
  }

  getUsers() {
    return this.usersSubject;
  }

  deleteUser(user) {
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].user_id == user.id) {
        this.users.splice(i, 1);
        break;
      }
    }
    this.usersSubject.next(this.users);
  }
}
