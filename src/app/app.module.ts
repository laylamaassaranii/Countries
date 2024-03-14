import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TokenExpirationService } from './auth/api/tokenExpiration/token-expiration.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatInputModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [provideClientHydration(), TokenExpirationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
