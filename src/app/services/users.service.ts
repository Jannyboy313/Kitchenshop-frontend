import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[];
  private usersSubject = new Subject<User[]>();

  constructor(private http: HttpClient) {
    this.usersSubject.next([]);
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
    .pipe(map(data => data.map(data => new User().deserialize(data))));
  }

  setUsers(users: User[]) {
    this.users = users;
    return this.usersSubject.next(this.users);
  }

  getUsersSubject() {
    return this.usersSubject;
  }

  deleteUser(user: User) {
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].user_id == user.user_id) {
        this.users.splice(i, 1);
        break;
      }
    }
    this.usersSubject.next(this.users);
    return this.http
    .delete(`${environment.apiUrl}/deleteuser?user_id=${user.user_id}`);
  }

  setRole(user: User) {
    for (let i=0; i<this.users.length; i++) {
      if (this.users[i].user_id == user.user_id) {
        this.users[i].role = user.role
        break;
      }
    }
    this.usersSubject.next(this.users);
  }
}
