import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    AuthModule,
    CountriesModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
