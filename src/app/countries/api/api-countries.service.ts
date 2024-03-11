import { Injectable } from '@angular/core';
import { API_COUNTRIES } from '../components/constants/constants-countries';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCountriesService {
  private api_url = API_COUNTRIES;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.api_url}`);
  }

  // login(userData: any): Observable<any> {
  //   return this.http.post<any>(`${this.api_url}/api/User/Login()`, userData)
  // }

  // getUserById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.api_url}/api/User/GetUserById(${id})`);
  // }
}
