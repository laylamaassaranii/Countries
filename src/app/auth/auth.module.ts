import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { BackgroundComponent } from './components/shared/background/background.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, SignupComponent, BackgroundComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
