import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CountriesHomeComponent } from './components/countries-home/countries-home.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';

const countriesRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CountriesHomeComponent },
      { path: 'country/:countryCode', component: CountryDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(countriesRoutes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
