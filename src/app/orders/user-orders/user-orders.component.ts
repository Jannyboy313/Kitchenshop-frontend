import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  orders: Order[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getCustomerOrders();
  }

  getCustomerOrders() {
    this.orderService.getCustomerOrders()
      .subscribe(orders => this.orders = orders)
  }

}
