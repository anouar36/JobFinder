import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';  
import { Router, RouterModule } from '@angular/router';
import { LoginRequest } from '../../core/models/auth.models';  

import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  constructor(private authService: Auth, private router: Router) {}
  
  email: string= '';
  password: string ='';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  resetMessage: string = '';
  resetEmail: string = '';

  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.resetMessage = '';


    if(!this.loginData.email || !this.loginData.password){
      this.errorMessage = 'Please fill in all required fields.';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response); 
        this.successMessage = 'Login successful! Redirecting...';
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        this.isLoading = false;
      }
    });
  }  

  switchView(rote:string){
    if(rote=='login'){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/register']);
    }
  }
  onResetPassword() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.resetMessage = '';
}

}