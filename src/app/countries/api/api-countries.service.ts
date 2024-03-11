import { Injectable } from '@angular/core';
import { API_COUNTRIES } from '../components/constants/constants-countries';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCountriesService {
  private api_url = API_COUNTRIES;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http
      .get<any[]>(`${this.api_url}/all`)
      .pipe(
        map((countries) =>
          countries.filter(
            (country) => country.name.common.trim().toLowerCase() !== 'israel'
          )
        )
      );
  }

  getCountryById(code: string): Observable<any> {
    return this.http.get<any>(`${this.api_url}/alpha/${code}`).pipe(
      map((response) => {
        if (Array.isArray(response) && response.length > 0) {
          return response[0];
        } else {
          return null;
        }
      })
    );
  }
}
