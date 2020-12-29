import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  cancel() {
    this.router.navigate(['/login']);
  }
}