import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRequest } from '../../core/models/auth.models';
import { Auth } from '../../core/services/auth';
import { Router,RouterModule } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})


export class Register {

  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  confirmPassword: string = '';


  constructor(private authService: Auth, private router: Router) {}

  registerData: RegisterRequest = {
    firstName:'',
    lastName:'',
    email:'',
    password:''
  }


  onSubmit() {
    this.isLoading =true;
    this.errorMessage = '';
    this.successMessage = '';

    //validation 
    if(!this.registerData.email || !this.registerData.password || !this.registerData.firstName || !this.registerData.lastName){
      this.errorMessage = 'Please fill in all required fields.';
      this.isLoading = false;
      return;
    }

    //validation password match
    if(this.registerData.password !== this.confirmPassword){
      this.errorMessage = 'Passwords do not match.';
      this.isLoading = false;
      return;
    }


    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);  
        this.successMessage = 'Registration successful! Redirecting to login...';
        this.isLoading = false;
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
  onInputChange() {
    this.errorMessage = '';
    this.successMessage = '';
  }   

}

