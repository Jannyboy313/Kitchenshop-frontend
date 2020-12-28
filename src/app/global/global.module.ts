import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavigationbarComponent, FooterComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    NavigationbarComponent
  ]
})
export class GlobalModule { }
