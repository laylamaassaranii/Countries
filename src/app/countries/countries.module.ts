import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesHomeComponent } from './components/countries-home/countries-home.component';
import { WorldMapComponent } from './components/shared/world-map/world-map.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/card-list/card-list/card-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { BackgroundDetailsComponent } from './components/shared/background-details/background-details.component';
import { SearchBoxComponent } from './components/shared/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CountriesHomeComponent,
    WorldMapComponent,
    NavbarComponent,
    LayoutComponent,
    CardComponent,
    CardListComponent,
    CountryDetailsComponent,
    BackgroundDetailsComponent,
    SearchBoxComponent,
  ],
  imports: [CommonModule, CountriesRoutingModule, ReactiveFormsModule, NgbModule, FormsModule],
})
export class CountriesModule {}
