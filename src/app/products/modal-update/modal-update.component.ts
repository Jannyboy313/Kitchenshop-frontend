import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.css']
})
export class ModalUpdateComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;
  isShown = false;
  isLoading = false;
  isError = false;
  createProductForm: FormGroup;
  errorMessage: string;

  constructor(
    private modalService: ModalService,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private productsService: ProductsService
     ) {
      this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
      if (!this.id) {
          console.error('modal must have an id');
          return;
      }
      document.body.appendChild(this.element);
      this.modalService.add(this);
      this.initForm();
  }

  initForm(): void {
    this.createProductForm = this.formBuilder.group({
      productname: ['', [Validators.required,
        Validators.pattern('([a-zA-Z]*)')]],
      description: ['', [Validators.pattern(/[a-zA-Z0-9.,?!'"()@*-_&#]/)]],
      price: ['', [Validators.required,
        Validators.pattern(/[0-9.]/)]],
      stock: ['', [Validators.required,
        Validators.pattern(/[0-9]/)]]
    });
  }

  isInValidInput(fieldName): boolean {
    return this.createProductForm.controls[fieldName].invalid &&
      (this.createProductForm.controls[fieldName].dirty || this.createProductForm.controls[fieldName].touched);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  update() {
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
          this.close();
      },
      error: error => {
          this.isError = true;
          this.errorMessage = error.error;
          this.isLoading = false;
      }
    });
  }

  open(): void {
    this.isShown = true;
  }

  close(): void {
    this.isShown = false;
  }

  private createProduct(): Product {
    return new Product().deserialize(this.createProductForm.value);
  }
}
