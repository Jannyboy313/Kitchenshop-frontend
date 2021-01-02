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
    this.getAmountItems();
    this.removeDuplicates()
  }

  getAmountItems() {
    let itemsMap = new Map();
    this.items.forEach((item) => {
      if (itemsMap.has(item.productnumber)) {
        let count = itemsMap.get(item.productnumber) + 1;
        itemsMap.set(item.productnumber, count);
      } else {
        itemsMap.set(item.productnumber, 1);
      }
    })
  }

  removeDuplicates() {
    this.items.forEach((item) => {
      let exists = 0;
      console.log(item)
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

}
