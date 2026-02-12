import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Jops } from '../../core/services/jops';
import { JobsApiResponse,Job } from '../../core/models/models';
import {  SafeHtmlPipe  } from '../../core/pipes/safe-html.pipe.ts-pipe';



interface User {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,SafeHtmlPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  userLogining = localStorage.getItem('userLogining') ? JSON.parse(localStorage.getItem('userLogining')!) : null;

  jobs: Job[] = [];

  user: User = {
    id:  this.userLogining.id,
    name: this.userLogining.name,
    email: this.userLogining.email,
    firstName: this.userLogining.firstName,
    lastName: this.userLogining.lastName,
    avatar: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1242-1727859879.JPG"
  };

  activeTab: string = 'search-jobs';
  isLoading: boolean = true;

  constructor(
    private router: Router,
     private jobsService: Jops,
     private cdr: ChangeDetectorRef
    ){}

  searchQuery: string = '';
  locationQuery: string = '';

  ngOnInit () {
    this.jobsService.getAllJobs().subscribe({
      next: (response: JobsApiResponse) => {
        console.log(' all jobs ', response.results);

        const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
        this.jobs = response.results.map(job => ({
          ...job,
          isLiked: favorites.some((fav: Job) => fav.id === job.id)
        }));
        this.isLoading = false; // Stop loading
        this.cdr.detectChanges(); // Force update
      },  
      error: (err) => {
        console.error('Error fetching jobs:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

  }

  loadJobs() {
    this.jobs = this.jobs.map(job => ({
      ...job,
      isLiked: false
    }));
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery, 'in', this.locationQuery);
  }

  viewJobDetails(job: Job) {
    if (job.refs?.landing_page) {
      window.open(job.refs.landing_page, '_blank');
    } else {
      console.log('Viewing details for job:', job.name);
      alert(`Job Details:\n\nTitle: ${job.name}\nCompany: ${job.company?.name}\nLocation: ${job.locations?.[0]?.name || 'N/A'}\n\nClick "Apply Now" to visit the job application page.`);
    }
  }

  applyToJob(job: Job) {
    if (job.refs?.landing_page) {
      window.open(job.refs.landing_page, '_blank');
      console.log('Applying to job:', job.name);
    } else {
      alert('Application link is not available for this job.');
    }
  }

  toggleLike(job: Job) {
    job.isLiked = !job.isLiked;
    
    if (job.isLiked) {
      console.log('Job saved to favorites:', job.name);
      this.saveFavoriteJob(job);
    } else {
      console.log('Job removed from favorites:', job.name);
      this.removeFavoriteJob(job);
    }
  }

  saveFavoriteJob(job: Job) {
    const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
    const jobExists = favorites.find((fav: Job) => fav.id === job.id);
    
    if (!jobExists) {
      favorites.push(job);
      localStorage.setItem('favoriteJobs', JSON.stringify(favorites));
    }
  }

  removeFavoriteJob(job: Job) {
    const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');
    const updatedFavorites = favorites.filter((fav: Job) => fav.id !== job.id);
    localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites));
  }

}
