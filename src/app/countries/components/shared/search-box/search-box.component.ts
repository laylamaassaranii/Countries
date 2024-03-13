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
  regions: string[] = [];

  constructor(
    private apiCountriesService: ApiCountriesService,
    private fb: FormBuilder,
    private stateChangeService: StateChangeService
  ) {}

  ngOnInit(): void {
    this.getRegions();
  }

  fetchData(): void {
    this.apiCountriesService
      .getCountry(this.searchValue)
      .subscribe((countries) => {
        this.countries = countries;
        this.triggerStateChangeByName();
      });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }

  selectRegion(region: string): void {
    this.searchValue = region;
    this.triggerStateChangeByRegion();
  }

  search(): void {
    this.onSearchSubmit();
  }

  triggerStateChangeByName(): void {
    this.stateChangeService.updateState({
      type: 'name',
      value: this.searchValue,
    });
  }

  triggerStateChangeByRegion(): void {
    this.stateChangeService.updateState({
      type: 'region',
      value: this.searchValue,
    });
  }

  getRegions(): void {
    this.apiCountriesService.getRegions().subscribe(
      (regions: string[]) => {
        this.regions = regions;
      },
      (error) => {
        console.error('Error fetching regions:', error);
      }
    );
  }
}
