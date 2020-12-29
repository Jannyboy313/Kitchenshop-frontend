import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isError = false;
  constructor() { }

  ngOnInit(): void {
  }

    /// TODO: Please remove the timeout and fix it
    onSubmit(form: NgForm) {
      // doe iets
    }

}
