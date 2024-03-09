import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesHomeComponent } from './countries-home/countries-home.component';



@NgModule({
  declarations: [
    CountriesHomeComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule
  ]
})
export class CountriesModule { }
