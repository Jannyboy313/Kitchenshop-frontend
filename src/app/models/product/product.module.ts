import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductModule {
  productnumber: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
}
