import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { jwtDecode } from 'jwt-decode';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private sharedService: SharedService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | UrlTree {
    return this.sharedService.loginResponse$.pipe(
      map((response) => {
        const decodedToken = this.decodeToken(response.Login.AccessToken);
        if (!decodedToken) {
          return false;
        }
        const timeLeft = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const remainingTime = timeLeft - currentTime;
        if (remainingTime > 0) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearUserData() {
    localStorage.removeItem('user');
  }

  isAdmin(): Observable<boolean> {
    return this.sharedService.loginResponse$.pipe(
      map((response) => {
        const token = response.Login.AccessToken;
        const roles = this.decodeToken(token)?.realm_access?.roles;
        console.log(token);
        console.log(roles);
        console.log(roles?.includes('Admin'));
        return roles?.includes('Admin');
      })
    );
  }

  decodeToken(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }
}
