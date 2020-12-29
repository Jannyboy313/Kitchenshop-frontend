import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  /// TODO: Please remove the timeout and fix it
  onSubmit(form: NgForm) {
    if(!this.authService.login({email: form.value.email, password: form.value.password})) {
      setTimeout(() => {
        this.isError = true;
        form.reset();
      }, 500)

    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
