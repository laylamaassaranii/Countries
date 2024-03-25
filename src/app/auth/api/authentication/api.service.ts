import { Injectable } from '@angular/core';
import { API_URL } from '../../components/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_url = API_URL;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private router: Router
  ) {}

  createUser(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.api_url}/api/User/SignUp()`, userData)
      .pipe(
        tap((response) => {
          localStorage.setItem('userResponse', JSON.stringify(response));
        })
      );
  }

  createAdminUser(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.api_url}/api/User/CreateAdminUser()`, userData)
      .pipe(
        tap((response) => {
          localStorage.setItem('userResponse', JSON.stringify(response));
        })
      );
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.api_url}/api/User/Login()`, userData);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.api_url}/api/User/Logout()`, {}).pipe(
      tap(() => {
        localStorage.removeItem('userResponse');
        this.router.navigate(['/login']);
      })
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api_url}/api/User/GetUserById(${id})`);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/api/User/GetProfile()`);
  }
}
