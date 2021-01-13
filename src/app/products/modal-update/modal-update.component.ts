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
  @Input() product: Product;
  notChangedProduct: Product;
  private element: any;
  isShown = false;
  isLoading = false;
  isError = false;
  updateProductForm: FormGroup;
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
      this.notChangedProduct = this.product;
      document.body.appendChild(this.element);
      this.modalService.add(this);
      this.initForm();
  }

  initForm(): void {
    this.updateProductForm = this.formBuilder.group({
      productname: ['', [Validators.required,
        Validators.pattern(/[a-zA-Z\s]*/)]],
      description: ['', [Validators.pattern(/[a-zA-Z0-9.,?!'"()@*-_&#\s]/)]],
      price: ['', [Validators.required,
        Validators.pattern(/[0-9.]/)]],
      stock: ['', [Validators.required,
        Validators.pattern(/[0-9]/)]]
    });
    this.addValue(this.product);
  }

  addValue(product):any {
    this.updateProductForm.setValue({
      productname: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock
    });
  }

  isInValidInput(fieldName): boolean {
    return this.updateProductForm.controls[fieldName].invalid &&
      (this.updateProductForm.controls[fieldName].dirty || this.updateProductForm.controls[fieldName].touched);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  update() {
    this.isError = false;
    if (this.updateProductForm.invalid) {
        this.isError = true
        this.errorMessage = "Missing data fields"
        return;
    }
    this.isLoading = true;
    this.setProduct();
    this.productsService.updateProduct(this.product)
    .subscribe({
      next: () => {
          this.notChangedProduct = this.product;
          this.close();
          this.isLoading = false;
      },
      error: error => {
          this.isError = true;
          this.errorMessage = error.error.error;
          this.isLoading = false;
      }
    });
  }

  open(): void {
    this.isShown = true;
    this.addValue(this.notChangedProduct);
  }

  close(): void {
    this.isShown = false;
  }

  private setProduct() {
    this.product.name = this.updateProductForm.get('productname').value;
    this.product.description = this.updateProductForm.get('description').value;
    this.product.price = this.updateProductForm.get('price').value;
    this.product.stock = this.updateProductForm.get('stock').value;
  }
}
