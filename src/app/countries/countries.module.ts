import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesHomeComponent } from './components/countries-home/countries-home.component';
import { WorldMapComponent } from './components/shared/world-map/world-map.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    CountriesHomeComponent,
    WorldMapComponent,
    NavbarComponent,
    LayoutComponent,
    CardComponent,
  ],
  imports: [CommonModule, CountriesRoutingModule],
})
export class CountriesModule {}
