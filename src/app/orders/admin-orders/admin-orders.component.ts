import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders = new Map<string, Order[]>();
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAdminOrders();
  }

  getAdminOrders() {
    this.orderService.getAdminOrders()
      .subscribe(orders => {
        this.orders = this.ordersByDate(orders);
        this.ordersByAmount();
      });
  }

  deleteProduct(key, order) {
    for(let i=0; i < this.orders.get(key).length; i++) {
      if (this.orders.get(key)[i] === order) {
        if (order.amount === 1) {
          this.orders.get(key).splice(i, 1);
        } else {
          this.orders.get(key)[i].amount--;
        }
        this.orderService.deleteOrder(order.orders_id);
        break;
      }
    }
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
