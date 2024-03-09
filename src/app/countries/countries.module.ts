import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesHomeComponent } from './countries-home/countries-home.component';
import { WorldMapComponent } from './shared/world-map/world-map.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [CountriesHomeComponent, WorldMapComponent, NavbarComponent],
  imports: [CommonModule, CountriesRoutingModule],
})
export class CountriesModule {}
