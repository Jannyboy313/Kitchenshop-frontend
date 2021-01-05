import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { HomePageComponent } from './home-page/home-page.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HotProductsComponent } from './hot-products/hot-products.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [CarouselComponent, HomePageComponent, HotProductsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class HomeModule { }
