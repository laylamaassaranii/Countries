import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor() {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const storedDataString = localStorage.getItem('userResponse');

    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);

      const enabled = storedData.enabled;

      if (enabled) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  clearUserData() {
    localStorage.removeItem('user');
  }

  isAdmin(): boolean {
    const user = this.getUserData();
    const token = user ? user.AccessToken : null;
    const roles = this.decodeToken(token)?.realm_access?.roles;
    return roles?.includes('Admin');
  }

  decodeToken(token: string): any {
    if (!token) return null;

    const [, payload] = token.split('.', 3); // Split the token into three parts and get the payload (middle part)
    const decodedPayload = atob(payload); // Decode the base64 encoded payload
    return JSON.parse(decodedPayload); // Parse the JSON payload
  }
}
