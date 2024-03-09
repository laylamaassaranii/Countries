import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((mod) => mod.CountriesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
