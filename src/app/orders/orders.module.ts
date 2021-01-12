import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [UserOrdersComponent, AdminOrdersComponent],
  imports: [
    CommonModule
  ]
})
export class OrdersModule { }
