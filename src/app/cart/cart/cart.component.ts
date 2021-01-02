import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  itemsArray: Product[] = [];
  filteredItemsArray: Product[] = [];
  amountItems = new Map();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.itemsArray = this.cartService.getItems();
    this.getAmountItems();
    this.removeDuplicates()
  }

  getAmountItems() {
    let itemsMap = new Map();
    this.itemsArray.forEach((item) => {
      if (itemsMap.has(item.productnumber)) {
        let count = itemsMap.get(item.productnumber) + 1;
        itemsMap.set(item.productnumber, count);
      } else {
        itemsMap.set(item.productnumber, 1);
      }
    })
  }

  removeDuplicates() {
    this.itemsArray.forEach((item) => {
      let exists = 0;
      console.log(item)
      this.filteredItemsArray.forEach(element => {
        if (element.productnumber === item.productnumber) {
          exists++;
        }
      });
      if (exists === 0) {
        this.filteredItemsArray.push(item);
      }
    })
  }

}
