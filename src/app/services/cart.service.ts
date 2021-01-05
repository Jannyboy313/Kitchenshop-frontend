import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

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
  orders: Order[] = [];

  constructor(private http: HttpClient, private authservice: AuthService) { }

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

  getItemsInCart() {
    return this.itemsInCart;
  }

  getTotalLength() {
    return this.itemsInCart.length;
  }

  clearCart() {
    this.itemsInCart = [];
    this.orders = [];
  }

  setOrders(orders) {
    this.orders = orders;
  }

  getOrders() {
    return this.orders;
  }

  pay() {
    this.createOrders()
    return this.http.post<any>(environment.apiUrl + "/addorders", this.orders);
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i=0; i < this.itemsInCart.length; i++) {
      totalPrice += parseFloat(this.itemsInCart[i].price);
    }
    return this.roundToTwoDecimals(totalPrice);
  }

  getTotalPriceWithoutVat() {
    let totalPrice = this.getTotalPrice() * 0.79
    return this.roundToTwoDecimals(totalPrice);
  }

  roundToTwoDecimals(number) {
    number = number * 100;
    number = Math.trunc(number);
    return number / 100;
  }

  private createOrders() {
    this.itemsInCart.forEach((item) => {
      this.orders.push(new Order().deserialize({"user_id": this.authservice.getUser().user_id, "productnumber": item.productnumber}))
    })
  }

}
