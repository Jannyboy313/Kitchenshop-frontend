import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../services/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  filteredItems: Product[] = [];
  amountItems = new Map();
  isBuying = false;
  modalRef;

  constructor(private cartService: CartService, private authservice: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.updateItems();
  }

  updateItems = async() =>{
    this.items = await this.cartService.getItemsInCart();
    this.setAmountItems();
    this.removeDuplicates()
  }

  setAmountItems() {
    this.amountItems.clear()
    this.items.forEach((item) => {
      if (this.amountItems.has(item.productnumber)) {
        let count = this.amountItems.get(item.productnumber) + 1;
        this.amountItems.set(item.productnumber, count);
      } else {
        this.amountItems.set(item.productnumber, 1);
      }
    })
  }

  removeDuplicates() {
    this.filteredItems = [];
    this.items.forEach((item) => {
      let exists = 0;
      this.filteredItems.forEach(element => {
        if (element.productnumber === item.productnumber) {
          exists++;
        }
      });
      if (exists === 0) {
        this.filteredItems.push(item);
      }
    })
  }

  getAmount(item: Product) {
    return this.amountItems.get(item.productnumber);
  }

  addItem(item: Product) {
    this.cartService.addItem(item);
    this.updateItems();
  }

  removeItem(item: Product) {
    this.cartService.removeItem(item);
    this.updateItems();
  }

  getTotalPriceItem(item: Product) {
    return parseFloat(item.price) * this.getAmount(item);
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let i=0; i < this.items.length; i++) {
      totalPrice += parseFloat(this.items[i].price);
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

  checkout() {
    if (!this.authservice.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.setOrders(this.createOrders());
  }

  private createOrders() {
    let orders: Order[];
    this.items.forEach((item) => {
      orders.push(new Order().deserialize({"user_id": this.authservice.getUser().user_id, "productnumber": item.productnumber}))
    })
    return orders;
  }
}
