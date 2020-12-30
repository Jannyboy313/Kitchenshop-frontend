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
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required],
      firstName: ['', [Validators.required,
      Validators.pattern('([A-Z][a-zA-Z]*)')]],
      middleName: ['', Validators.pattern('([A-Z][a-zA-Z]*)')],
      lastName: ['', [Validators.required,
      Validators.pattern('([A-Z][a-zA-Z]*)')]]
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