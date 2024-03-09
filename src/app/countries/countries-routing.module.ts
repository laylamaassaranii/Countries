import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CountriesHomeComponent } from './countries-home/countries-home.component';

const countriesRoutes: Routes = [
  { path: '', component: CountriesHomeComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(countriesRoutes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
