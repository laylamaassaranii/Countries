import { Component, OnInit } from '@angular/core';
import { ApiCountriesService } from './countries/api/api-countries/api-countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private apiCountriesService: ApiCountriesService) { }

  ngOnInit(): void {
    this.initializeCountries();
  }

  initializeCountries(): void {
    this.apiCountriesService.getCountry().subscribe((countries) => {
      console.log('Countries loaded:', countries);
    });
  }
}
