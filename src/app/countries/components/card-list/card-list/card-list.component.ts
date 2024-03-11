import { Component, OnInit } from '@angular/core';
import { ApiCountriesService } from '../../../api/api-countries.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit {
  countries: any[] = [];

  constructor(private apiCountriesService: ApiCountriesService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.apiCountriesService.getCountries().subscribe(
      (data) => {
        this.countries = data;
        console.log(this.countries);
      },
      (error) => {
        console.error('Error fetching countries:', error);
      }
    );
  }
}
