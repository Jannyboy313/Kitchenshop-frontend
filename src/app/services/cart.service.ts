import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInCart = [];

  constructor() { }

  addProduct(product: Product) {
    this.productsInCart.push(product);
  }

  removeProduct(product: Product) {
    this.productsInCart.forEach((item, index) => {
      if (product.productnumber === item.productnumber) {
        this.productsInCart.splice(index, 1);
        return;
      }
    })
  }

  clearCart() {
    this.productsInCart = [];
  }
}
