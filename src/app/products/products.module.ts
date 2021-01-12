import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductInfoModalComponent } from './product-info-modal/product-info-modal.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductPageComponent, ProductInfoModalComponent, ProductCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
