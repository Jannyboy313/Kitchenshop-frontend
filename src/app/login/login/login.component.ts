import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  isError = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit (form: NgForm){
    this.isLoading = true;
    this.isError = false;

    if (!form.valid) {
      this.isError = true;
      this.isLoading = false;
      return;
    }
    this.login(form);
  }

  register() {
    this.router.navigate(['/register']);
  }

  private login(form: NgForm) {
    this.authService.postLogin({email: form.value.email, password: form.value.password})
    .subscribe({
      next: value => {
        this.authService.loginUser(new User().deserialize(value.User), value.token);
      },
      error: error => {
        this.isError = true;
        this.isLoading = false;
        form.reset();
      }
    });
  }
}
