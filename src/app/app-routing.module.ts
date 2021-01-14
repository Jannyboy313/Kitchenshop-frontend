import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ProductPageComponent } from './products/product-page/product-page.component'
import { UserOrdersComponent } from './orders/user-orders/user-orders.component';
import { AdminOrdersComponent } from './orders/admin-orders/admin-orders.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';
import { UsersComponent } from './users/users/users.component';
import { AboutUsComponent } from './about-us/about-us/about-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/productupdate', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products', component: ProductPageComponent},
  { path: 'customerorders', component: UserOrdersComponent},
  { path: 'adminorders', component: AdminOrdersComponent},
  { path: 'productcreate', component: ProductCreateComponent},
  { path: 'productupdate', component: ProductUpdateComponent},
  { path: 'users', component: UsersComponent},
  { path: 'aboutus', component: AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
