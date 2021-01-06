import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ProductPageComponent } from './products/product-page/product-page.component'
import { UserOrdersComponent } from './orders/user-orders/user-orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/customerorders', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductPageComponent},
  { path: 'customerorders', component: UserOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
