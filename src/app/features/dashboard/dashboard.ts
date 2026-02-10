import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  logo: string;
  posted: string;
}

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
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  private userLogining = localStorage.getItem('userLogining') ? JSON.parse(localStorage.getItem('userLogining')!) : null; 
  
  user: User = {
    id:  this.userLogining.id,
    name: this.userLogining.name,
    email: this.userLogining.email,
    firstName: this.userLogining.firstName,
    lastName: this.userLogining.lastName,
    avatar: "https://intranet.youcode.ma/storage/users/profile/thumbnail/1242-1727859879.JPG"
  };

  activeTab: string = 'search-jobs';

  constructor(private router: Router){}

 
  
  searchQuery: string = '';
  locationQuery: string = '';

  

  jobs: Job[] = [
    {
      id: 1,
      title: 'Senior Product Designer',
      company: 'TechFlow',
      location: 'San Francisco, CA',
      type: 'Full Time',
      salary: '$120k - $160k',
      description: 'We are looking for an experienced Product Designer to lead our design team and help shape the future of our products.',
      logo: 'TF',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Creative Studio',
      location: 'Remote',
      type: 'Contract',
      salary: '$80k - $110k',
      description: 'Join our creative team to build stunning web experiences for our clients using modern frontend technologies.',
      logo: 'CS',
      posted: '5 hrs ago'
    },
    {
      id: 3,
      title: 'UX Researcher',
      company: 'Global Systems',
      location: 'New York, NY',
      type: 'Full Time',
      salary: '$110k - $140k',
      description: 'Help us understand our users better through qualitative and quantitative research methods.',
      logo: 'GS',
      posted: '1 day ago'
    }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery, 'in', this.locationQuery);
    // In a real app, this would filter the jobs or make an API call
  }
}
