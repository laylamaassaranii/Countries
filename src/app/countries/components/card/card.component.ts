import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() country: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToCountryDetails(country: any): void {
    this.router.navigate(['/countries/country', country.cca3]);
  }
}
