import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCountriesService } from '../../api/api-countries/api-countries.service';
import { AuthguardService } from '../../../auth/api/authguard/authguard.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  country: any;
  isAdmin: boolean = false;
  isReadOnly = false;
  editedCountryName: string = '';
  editedCapital: string = '';
  editedRegion: string = '';
  editedPopulation: number = 0;
  editedArea: number = 0;

  constructor(
    private route: ActivatedRoute,
    private countryService: ApiCountriesService,
    private authguardService: AuthguardService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const countryCode = params['countryCode'];
      this.fetchCountryDetails(countryCode);
      this.checkAdminStatus();
    });
  }

  fetchCountryDetails(countryCode: string): void {
    this.countryService.getCountryById(countryCode).subscribe((country) => {
      this.country = country;
      this.editedCountryName = country.name.official;
      this.editedCapital = country.capital[0];
      this.editedRegion = country.region;
      this.editedPopulation = country.population;
      this.editedArea = country.area;
    });
  }

  editCountry() {
    this.isReadOnly = !this.isReadOnly;
  }

  updateField(fieldName: string, value: any) {
    this.country[fieldName] = value;
    this.countryService.updateCountryInLocal(this.country);
  }
  checkAdminStatus() {
    this.authguardService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }
}
