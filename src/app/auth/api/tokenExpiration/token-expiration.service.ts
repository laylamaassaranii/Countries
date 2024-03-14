import { Injectable, OnDestroy } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../authentication/api.service';

@Injectable({
  providedIn: 'root',
})
export class TokenExpirationService implements OnDestroy {
  private tokenExpirationSubscription: Subscription | undefined;

  constructor(
    private sharedService: SharedService,
    private apiService: ApiService
  ) {
    this.tokenExpirationSubscription =
      this.sharedService.loginResponse$.subscribe((response) => {
        const decodedToken = this.decodeToken(response.Login.AccessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeLeft = expirationTime - currentTime;

        if (timeLeft <= 0) {
          this.apiService.logout();
          return;
        }

        this.checkRemainingTime(timeLeft);
      });
  }

  ngOnDestroy() {
    if (this.tokenExpirationSubscription) {
      this.tokenExpirationSubscription.unsubscribe();
    }
  }

  checkRemainingTime(timeLeft: number) {
    setInterval(() => {
      timeLeft -= 60000;
      if (timeLeft <= 0) {
        this.apiService.logout();
      }
    }, 60000);
  }

  decodeToken(token: string): any {
    {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        return null;
      }
    }
  }
}
