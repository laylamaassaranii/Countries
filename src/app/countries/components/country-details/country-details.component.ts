import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCountriesService } from '../../api/api-countries/api-countries.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent implements OnInit {
  country: any;

  constructor(
    private route: ActivatedRoute,
    private countryService: ApiCountriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const countryCode = params['countryCode'];
      this.fetchCountryDetails(countryCode);
    });
  }

  fetchCountryDetails(countryCode: string): void {
    this.countryService.getCountryById(countryCode).subscribe((country) => {
      this.country = country;
    });
  }
}
