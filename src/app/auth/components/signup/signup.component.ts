import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  selectedUserType!: string;
  adminSelected: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  @ViewChild('firstNameInput') firstNameInput!: ElementRef;
  @ViewChild('lastNameInput') lastNameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      admin: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    // Handle form submission logic here
    if (this.signupForm.valid) {
      console.log('Form submitted with data:', this.signupForm.value);
    }
  }

  selectUserType(userType: string) {
    this.selectedUserType = userType;
    // Update the admin form control value based on user selection
    this.signupForm.get('admin')?.setValue(userType === 'admin' ? 1 : 0);
  }
}
