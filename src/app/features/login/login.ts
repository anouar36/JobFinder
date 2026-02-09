import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../core/services/auth';  
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  constructor(private authService: Auth, private router: Router) {}
  
  email: string= '';
  password: string ='';
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    if(!this.email || !this.password){
      this.errorMessage = 'Please fill in all required fields.';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
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

}
