import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-info-modal',
  templateUrl: './product-info-modal.component.html',
  styleUrls: ['./product-info-modal.component.css']
})
export class ProductInfoModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() product: Product;
  private element: any;
  isShown = false;

  constructor(
    private modalService: ModalService,
     private el: ElementRef,
     private cartService: CartService,) {
      this.element = this.el.nativeElement;
  }

  ngOnInit(): void {
      if (!this.id && !this.product) {
          console.error('modal must have an id and product');
          return;
      }
      document.body.appendChild(this.element);
      this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.isShown = true;
  }

  close(): void {
    this.isShown = false;
  }

  addToCart(): void{
    this.cartService.addItem(this.product);
    this.close();
  }
}
