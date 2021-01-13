import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from '../../services/products.service';
import { Image } from '../../models/image.model';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.createProductForm = this.formBuilder.group({
      name: ['', [Validators.required,
        Validators.pattern(/[a-zA-Z\s]*/), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(1000)]],
      price: ['', [Validators.required,
        Validators.pattern(/^\d+(.\d{2})?$/)]],
      stock: ['', [Validators.required,
        Validators.pattern(/[0-9]/)]]
    });
  }

  isInValidInput(fieldName): boolean {
    return this.createProductForm.controls[fieldName].invalid &&
      (this.createProductForm.controls[fieldName].dirty || this.createProductForm.controls[fieldName].touched);
  }

  onSubmit() {
    this.isError = false;
    if (this.createProductForm.invalid) {
        this.isError = true
        this.errorMessage = "Missing data fields"
        return;
    }
    this.isLoading = true;
    const product = this.createProduct();
    this.productsService.addProduct(product)
    .subscribe({
      next: () => {
          this.router.navigate(['/products']);
      },
      error: error => {
          this.isError = true;
          this.errorMessage = error.error;
          this.isLoading = false;
      }
    });
  }

  reset() {
    this.createProductForm.reset();
  }

  private createProduct(): Product {
    return new Product().deserialize(this.createProductForm.value);
  }
}
