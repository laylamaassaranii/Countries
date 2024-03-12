import { Component, OnInit } from '@angular/core';
import { ApiCountriesService } from '../../../api/api-countries/api-countries.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StateChangeService } from '../../../api/state-change/state-change.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit {
  searchValue = '';
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });
  countries: any[] = [];
  searchResults: any[] = [];

  constructor(
    private apiCountriesService: ApiCountriesService,
    private fb: FormBuilder,
    private stateChangeService: StateChangeService
  ) {}

  ngOnInit(): void {
    // this.fetchData();
  }

  fetchData(): void {
    this.apiCountriesService
      .getCountry(this.searchValue)
      .subscribe((countries) => {
        this.countries = countries;
        this.triggerStateChange();
      });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }

  search(): void {
    this.onSearchSubmit();
  }

  triggerStateChange(): void {
    this.stateChangeService.updateState(this.searchValue);
  }
}
