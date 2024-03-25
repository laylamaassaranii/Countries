import { Injectable } from '@angular/core';
import { API_COUNTRIES } from '../../components/constants/constants-countries';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCountriesService {
  private api_url = API_COUNTRIES;
  private localStorageKey = 'countries'; // Key for storing countries in local storage

  constructor(private http: HttpClient) {}

  getCountry(query: string = '', type: string = ''): Observable<any[]> {
    if (query) {
      if (type == 'name') {
        return this.http.get<any[]>(
          `${this.api_url}/name/${query}?fullText=true`
        );
      } else if (type == 'region') {
        return this.http
          .get<any[]>(`${this.api_url}/region/${query}`)
          .pipe(
            map((countries) =>
              countries.filter(
                (country) =>
                  country.name.common.trim().toLowerCase() !== 'israel'
              )
            )
          );
      }
    }
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

  getRegions(): Observable<string[]> {
    return this.http.get<any[]>(`${this.api_url}/all`).pipe(
      map((countries) => {
        const regionsSet = new Set<string>();
        countries.forEach((country) => {
          regionsSet.add(country.region);
        });
        return Array.from(regionsSet);
      })
    );
  }

  private saveCountriesToLocal(countries: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(countries));
  }

  private getCountriesFromLocal(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  updateCountryInLocal(country: any): void {
    const countries = this.getCountriesFromLocal();
    const index = countries.findIndex(
      (c) => c.alpha3Code === country.alpha3Code
    );
    if (index !== -1) {
      countries[index] = country;
      this.saveCountriesToLocal(countries);
    }
  }

  getCountries(query: string = '', type: string = ''): Observable<any[]> {
    const countries = this.getCountriesFromLocal();
    if (countries.length > 0) {
      return of(countries); // Return data from local storage if available
    } else {
      let observable: Observable<any[]> | null = null; // Initialize as null
      if (query) {
        if (type == 'name') {
          observable = this.http.get<any[]>(
            `${this.api_url}/name/${query}?fullText=true`
          );
        } else if (type == 'region') {
          observable = this.http.get<any[]>(`${this.api_url}/region/${query}`);
        }
      } else {
        observable = this.http.get<any[]>(`${this.api_url}/all`);
      }

      if (observable) {
        // Check if observable is not null
        return observable.pipe(
          map((countries) => {
            this.saveCountriesToLocal(countries); // Save countries to local storage
            return countries;
          })
        );
      } else {
        throw new Error('Invalid query or type.'); // Handle invalid query or type
      }
    }
  }

  getCountriesById(code: string): Observable<any> {
    const countries = this.getCountriesFromLocal();
    const country = countries.find((c) => c.alpha3Code === code);
    if (country) {
      return of(country);
    } else {
      return this.http.get<any>(`${this.api_url}/alpha/${code}`).pipe(
        map((response) => {
          if (Array.isArray(response) && response.length > 0) {
            const country = response[0];
            this.updateCountryInLocal(country); // Update in local storage
            return country;
          } else {
            return null;
          }
        })
      );
    }
  }

  getCountriesRegions(): Observable<string[]> {
    const countries = this.getCountriesFromLocal();
    const regionsSet = new Set<string>();
    countries.forEach((country) => {
      regionsSet.add(country.region);
    });
    return of(Array.from(regionsSet));
  }
}
