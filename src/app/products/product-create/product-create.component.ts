import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  createProductForm: FormGroup;
  isError: boolean = false;
  errorMessage: string = 'Error not known';
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.createProductForm = this.formBuilder.group({
      productname: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      description: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      price: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      stock: ['', [Validators.required,
        Validators.pattern(/([A-Za-z])\s+(\d){1,}(\w{0,1})/)]],
      category: ['', [Validators.required,
        Validators.pattern(/(\d{4})\s?([A-Za-z]{2})/)]],
    });
  }

  isInValidInput(fieldName): boolean {
    return this.createProductForm.controls[fieldName].invalid &&
      (this.createProductForm.controls[fieldName].dirty || this.createProductForm.controls[fieldName].touched);
  }

  onSubmit() {
  }

  reset() {

  }

  goToProducts() {

  }

}
