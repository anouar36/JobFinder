import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JobsApiResponse,Job } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class Jops {
  

  private apiUrl = 'https://www.themuse.com/api/public/jobs?page=0';

  constructor(private http: HttpClient){}

  getAllJobs() {
    return this.http.get<JobsApiResponse>(this.apiUrl);
  }

  getJobById(id:number){
 return this.http.get<Job>(
  `http://localhost:3000/jobs/${id}`
 );
}

  
}
