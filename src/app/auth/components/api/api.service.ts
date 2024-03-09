import { Injectable } from '@angular/core';
import { API_URL } from '../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_url = API_URL;

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.api_url}/api/User/SignUp()`, userData);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api_url}/api/User/GetUserById(${id})`);
  }
}
