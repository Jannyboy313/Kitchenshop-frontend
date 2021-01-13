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
      name: ['', [Validators.required,
        Validators.pattern(/[a-zA-Z\s]*/), Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(1000)]],
      price: ['', [Validators.required,
        Validators.pattern(/^\d+(.\d{2})?$/)]],
      stock: ['', [Validators.required,
        Validators.pattern(/[0-9]/)]]
    });
    this.addValue(this.product);
  }

  addValue(product):any {
    this.updateProductForm.setValue({
      name: product.name,
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
    } else if(!this.isChange()) {
      this.isError = true
      this.errorMessage = "Nothing is changed"
      return;
    }
    this.isLoading = true;
    this.product = this.setProduct();
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

  private isChange() {
    let copyProduct = this.setProduct();
    if(copyProduct !== this.product) {
      return true;
    }
    return false;
  }

  private setProduct(): Product {
    let updateProduct = this.product;
    updateProduct.name = this.updateProductForm.get('name').value;
    updateProduct.description = this.updateProductForm.get('description').value;
    updateProduct.price = this.updateProductForm.get('price').value;
    updateProduct.stock = this.updateProductForm.get('stock').value;
    return updateProduct;
  }
}
