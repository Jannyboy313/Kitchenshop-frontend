import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { BuyModelComponent } from './buy-model/buy-model.component';


@NgModule({
  declarations: [CartComponent, BuyModelComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BuyModelComponent
  ]
})
export class CartModule { }
