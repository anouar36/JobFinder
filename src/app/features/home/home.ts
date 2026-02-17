import { ChangeDetectionStrategy, ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsApiResponse, Job } from '../../core/models/models';
import { Jops } from '../../core/services/jops';




@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchQuery: string = '';
  allJobs: Job[] = [];
  isLoading: boolean =true;


  constructor(
            private router: Router,
            private jobsService: Jops,
            private cdr: ChangeDetectorRef
          ) {}

  ngOnInit(){
    this.jobsService.getAllJobs().subscribe({
      next:(response:JobsApiResponse)=>{
      console.log(' all jobs ', response.results);





      const favorites = JSON.parse(localStorage.getItem('favoriteJobs') || '[]');

      this.allJobs = response.results.map(job => ({
        ...job,
        isLiked: favorites.some((fav: Job) => fav.id === job.id)
      }));
      this.isLoading = false; 
      this.cdr.detectChanges(); 
      },
      error:(err)=>{

      }
    })
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  viewJobDetails(jobId: number) {
    console.log('Viewing job:', jobId);
    // Navigate to job details page (you can implement this later)
  }

  onSearch() {
    // if (!this.searchQuery.trim()) {
    //   this.jobs = [...this.allJobs];
    //   return;
    // }

    // const query = this.searchQuery.toLowerCase().trim();
    // this.jobs = this.allJobs.filter(job => 
    //   job.title.toLowerCase().includes(query) ||
    //   job.company.toLowerCase().includes(query) ||
    //   job.location.toLowerCase().includes(query) ||
    //   job.description.toLowerCase().includes(query) ||
    //   job.tags.some(tag => tag.toLowerCase().includes(query))
    // );
  }
}
