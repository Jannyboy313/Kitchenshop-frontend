import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';



@NgModule({
  declarations: [NavigationbarComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NavigationbarComponent
  ]
})
export class GlobalModule { }
