import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/auth.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}


  register(user: RegisterRequest): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}&password=${password}`);
  }

}
