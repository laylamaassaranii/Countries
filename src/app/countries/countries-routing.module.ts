import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CountriesHomeComponent } from './components/countries-home/countries-home.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { CardComponent } from './components/card/card.component';

const countriesRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CountriesHomeComponent },
      { path: 'card', component: CardComponent },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(countriesRoutes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
