import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { BuyModalComponent } from './buy-modal/buy-modal.component';

@NgModule({
  declarations: [NavigationbarComponent, FooterComponent, BuyModalComponent],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule
  ],
  exports: [
    NavigationbarComponent,
    FooterComponent,
  ]
})
export class GlobalModule { }
