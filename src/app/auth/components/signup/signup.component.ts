import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api/authentication/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  selectedUserType!: string;
  adminSelected: boolean = false;
  focusedEmail: boolean = false;
  focusedPassword: boolean = false;
  focusedFirstName: boolean = false;
  focusedLastName: boolean = false;

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
    this.signupForm = this.formBuilder.group({
      Firstname: ['', Validators.required],
      Lastname: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      Rolename: [],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const userData = {
        firstName: this.signupForm.get('Firstname')?.value,
        lastName: this.signupForm.get('Lastname')?.value,
        email: this.signupForm.get('Email')?.value,
        password: this.signupForm.get('Password')?.value,
        rolename: this.adminSelected ? '1' : '',
      };
      if (this.adminSelected) {
        this.apiService.createAdminUser(userData).subscribe(
          (response) => {
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      } else {
        this.apiService.createUser(userData).subscribe(
          (response) => {
            this.router.navigate(['/countries']);
          },
          (error) => {
            console.error('Error creating user:', error);
          }
        );
      }
    }
  }
  getUserById(userId: number) {
    this.apiService.getUserById(userId).subscribe(
      (userData) => {
        console.log('User data:', userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  outOfFocusEmail() {
    this.focusedEmail = true;
  }

  outOfFocusPassword() {
    this.focusedPassword = true;
  }

  outOfFocusFirstName() {
    this.focusedFirstName = true;
  }
  outOfFocusLastName() {
    this.focusedLastName = true;
  }
}
