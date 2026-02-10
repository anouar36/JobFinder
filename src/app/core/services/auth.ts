import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/auth.models';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

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
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map((users:any[])=>{
        if(users.length > 0){
          const user = users[0];
          localStorage.setItem('userLogining',JSON.stringify(user));
          return user;
        }else{
          return null;
        }
      })
    );
  }

  getCurrentUser(){
    const user = localStorage.getItem('userLogining');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }

}
