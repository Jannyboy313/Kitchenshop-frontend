import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  /// TODO: Please remove the timeout and fix it
  onSubmit(form: NgForm) {
    if(!this.authService.login({username: form.value.username, password: form.value.password})) {
      setTimeout(() => {
        this.isError = true;
        form.reset();
      }, 500)

    }
  }
}
