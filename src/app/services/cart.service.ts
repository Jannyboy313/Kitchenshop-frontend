import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsInCart: Product[] = [
    new Product().deserialize({
      "productnumber": 1,
      "name": "Product number 1",
      "description": "This is a very nice product that you should buy later",
      "price": "10.99",
      "stock": "10",
      "category": "Boeken",
    }),
    new Product().deserialize({
      "productnumber": 2,
      "name": "Product number 2",
      "description": "This is a very nice product that you should buy later",
      "price": "10.99",
      "stock": "10",
      "category": "Boeken",
    }),
    new Product().deserialize({
      "productnumber": 3,
      "name": "Product number 3",
      "description": "This is a very nice product that you should buy later",
      "price": "10.99",
      "stock": "10",
      "category": "Boeken",
    }),
    new Product().deserialize({
      "productnumber": 2,
      "name": "Product number 2",
      "description": "This is a very nice product that you should buy later",
      "price": "10.99",
      "stock": "10",
      "category": "Boeken",
    }),
  ];

  constructor() { }

  addItem(item: Product) {
    this.itemsInCart.push(item);
  }

  removeItem(removeItem: Product) {
    for(let i=this.itemsInCart.length-1; i >= 0; i--) {
      if (this.itemsInCart[i].productnumber === removeItem.productnumber) {
        this.itemsInCart.splice(i,1);
        return;
      }
    }
  }

  getItems() {
    return this.itemsInCart;
  }

  getTotal() {
    return this.itemsInCart.length;
  }

  clearCart() {
    this.itemsInCart = [];
  }

}
