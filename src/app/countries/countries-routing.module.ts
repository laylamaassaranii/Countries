import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CountriesHomeComponent } from './countries-home/countries-home.component';
import { LayoutComponent } from './shared/layout/layout.component';

const countriesRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CountriesHomeComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(countriesRoutes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
