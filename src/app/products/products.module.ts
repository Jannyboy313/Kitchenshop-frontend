import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductInfoModalComponent } from './product-info-modal/product-info-modal.component';

@NgModule({
  declarations: [ProductPageComponent, ProductInfoModalComponent],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
