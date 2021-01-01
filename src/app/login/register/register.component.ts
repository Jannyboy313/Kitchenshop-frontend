import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isError : boolean = false;
  errorMessage : string = 'Error not known';
  isLoading: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService) { }

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
      city: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      street_address: ['', [Validators.required,
        Validators.pattern(/(\d{4})\s+(\w{2})/)]],
      zipcode: ['', [Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s,'-]*$/)]],
      email: ['', [Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', Validators.required],
    });
  }

  isInValidInput(fieldName): boolean {
    return this.registerForm.controls[fieldName].invalid &&
      (this.registerForm.controls[fieldName].dirty || this.registerForm.controls[fieldName].touched);
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.isLoading = true;

  }

  createUser() {
    // const user = new User().deserialize()
  }

  createAddress() {
    const address = new Address().deserialize({
      "city": this.registerForm.controls['city'].value,
      "street_address": this.registerForm.controls['street_address'].value,
      "zipcode": this.registerForm.controls['zipcode'].value
    })
    // api call en zorgen dat het volledige address word terug gegeven (Address_id)
  }

  cancel() {
    this.router.navigate(['/login']);
  }
}