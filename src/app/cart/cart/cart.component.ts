import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  filteredItems: Product[] = [];
  amountItems = new Map();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.setAmountItems();
    this.removeDuplicates()
  }

  setAmountItems() {
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
  }

  removeItem(item: Product) {
    this.cartService.removeItem(item);
  }

}
