import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';



@NgModule({
  declarations: [CartComponent, CartItemComponent],
  imports: [
    CommonModule
  ]
})
export class CartModule { }
