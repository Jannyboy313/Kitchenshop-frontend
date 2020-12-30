import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      middleName: ['',Validators.pattern('([a-zA-Z]*)')],
      lastName: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      email: ['', [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
    });
  }

  isInValidInput(fieldName): boolean {
    return this.registerForm.controls[fieldName].invalid &&
      (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched);
  }

  // TODO: Please remove the timeout and fix it
  onSubmit() {
    // if(!this.authService.login({email: form.value.email, password: form.value.password})) {
    //   setTimeout(() => {
    //     form.reset();
    //   }, 500)

    // }
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}