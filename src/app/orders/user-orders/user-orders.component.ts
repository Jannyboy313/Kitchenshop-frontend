import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders = new Map<string, Order[]>();
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCustomerOrders();
  }

  getCustomerOrders() {
    this.orderService.getCustomerOrders()
      .subscribe(orders => {
        this.orders = this.ordersByDate(orders);
        this.ordersByAmount();
      });
  }

  private ordersByDate(orders) {
    let sortedOrders = new Map<string, Order[]>();
    for (let i=0; i < orders.length; i++) {
      if (!sortedOrders.has(orders[i].timestamp)) {
        sortedOrders.set(String(orders[i].timestamp), [])
      }
      sortedOrders.get(String(orders[i].timestamp)).push(orders[i]);
    }
    return sortedOrders;
  }

  private ordersByAmount() {
    this.orders.forEach((value, key) => {
      for(let i=0; i < this.orders.get(key).length; i++) {
        let exists = 0;
        for(let j=0; j < this.orders.get(key).length; j++) {
          if (this.orders.get(key)[i].productnumber === this.orders.get(key)[j].productnumber) {
            exists++
          }
          if (exists >=2) {
            this.orders.get(key).splice(j, 1);
          }
        }
        this.orders.get(key)[i].amount = exists;
        this.orders.get(key)[i].price = String(this.roundToTwoDecimals(this.orders.get(key)[i].price) * exists);
      }
    });
  }

  private roundToTwoDecimals(string) {
    let number = parseFloat(string);
    number = number * 100;
    number = Math.trunc(number);
    return number / 100;
  }

}
