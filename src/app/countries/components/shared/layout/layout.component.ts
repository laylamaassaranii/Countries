import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenExpirationService } from '../../../../auth/api/tokenExpiration/token-expiration.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy {
  private tokenExpirationSubscription: Subscription | undefined;

  constructor(private tokenExpirationService: TokenExpirationService) {
    // Subscribe to token expiration events
    // this.tokenExpirationSubscription = this.tokenExpirationService.expirationEvent$.subscribe(() => {
    //   // Perform logout or other actions when token expires
    //   this.logout();
    // });
  }

  ngOnDestroy() {
    // Unsubscribe from token expiration service
    if (this.tokenExpirationSubscription) {
      this.tokenExpirationSubscription.unsubscribe();
    }
  }
}
