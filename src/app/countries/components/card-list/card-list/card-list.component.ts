import { Component, OnInit } from '@angular/core';
import { ApiCountriesService } from '../../../api/api-countries/api-countries.service';
import { StateChangeService } from '../../../api/state-change/state-change.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit {
  countries: any[] = [];
  searchValue = '';
  searchType = '';

  constructor(
    private apiCountriesService: ApiCountriesService,
    private stateChangeService: StateChangeService
  ) {}

  ngOnInit(): void {
    this.stateChangeService.state$.subscribe((state) => {
      this.searchValue = state.value;
      this.searchType = state.type;
      this.getCountries(this.searchValue, this.searchType);
    });
  }

  getCountries(searchValue = '', searchType = '') {
    this.apiCountriesService.getCountry(searchValue, searchType).subscribe(
      (data) => {
        this.countries = data;
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
}
