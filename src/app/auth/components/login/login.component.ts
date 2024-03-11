import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  focusedEmail: boolean= false;
  focusedPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  @ViewChild('firstNameInput') firstNameInput!: ElementRef;
  @ViewChild('lastNameInput') lastNameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = {
        username: this.loginForm.get('Email')?.value,
        password: this.loginForm.get('Password')?.value,
      };

      this.apiService.login(userData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/countries']);
        },
        (error) => {
          console.error('Error logging in:', error);
        }
      );
    }
  }

  outOfFocusEmail(){
    this.focusedEmail = true;
  }

  outOfFocusPassword() {
    this.focusedPassword = true;
  }
}
