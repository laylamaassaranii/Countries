import { Injectable } from '@angular/core';
import { API_URL } from '../../components/constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_url = API_URL;

  constructor(private http: HttpClient, private usersService: UsersService) {}

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

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api_url}/api/User/GetUserById(${id})`);
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/api/User/GetProfile()`);
  }

  saveUserToIndexedDB(user: any): Promise<void> {
    return this.usersService.addUser(user);
  }

  // canActivateRoute(routeId: string): boolean {
  //   // Assuming you have the current user data available, you can pass it to the permissions service
  //   const currentUser: UserToken = getCurrentUser(); // Implement getCurrentUser() method to get the current user data
  //   return this.permissionsService.canActivate(currentUser, routeId);
  // }

  // // Method to check if the current user has matching permissions
  // canMatch(): boolean {
  //   // Assuming you have the current user data available, you can pass it to the permissions service
  //   const currentUser: UserToken = getCurrentUser(); // Implement getCurrentUser() method to get the current user data
  //   return this.permissionsService.canMatch(currentUser);
  // }
}
