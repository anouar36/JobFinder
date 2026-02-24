import { ChangeDetectionStrategy, ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsApiResponse, Job } from '../../core/models/models';
import { Jops } from '../../core/services/jops';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe.ts-pipe';




@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, SafeHtmlPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  searchQuery: string = '';
  allJobs: Job[] = [];
  isLoading: boolean =true;


  //pagination varibales 
  paginationJobs: Job[]= [];
  currentPage: number=1;
  itemsPerPage: number =10;
  totalPages: number = 0;



  constructor(
            private router: Router,
            private jobsService: Jops,
            private cdr: ChangeDetectorRef
          ) {}
  ngOnInit(){
    console.log('Home component initialized, fetching jobs...');
    this.isLoading = true;
    
    this.jobsService.getAllJobs().subscribe({
      next:(response:JobsApiResponse)=>{
        console.log('✅ Jobs loaded successfully:', response.results.length);
        this.allJobs = response.results;
        this.totalPages = Math.ceil(response.results.length / this.itemsPerPage);
        this.updatePaginated();
        
        this.isLoading = false; 
        this.cdr.detectChanges(); 
      },
      error:(err)=>{
        console.error('❌ Error loading jobs:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
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
    this.router.navigate(['/job-details', jobId]);
  }

  updatePaginated(){
    const starteIndex = (this.currentPage - 1 ) * this.itemsPerPage;
    const endIndex = starteIndex + this.itemsPerPage;
    this.paginationJobs = this.allJobs.slice(starteIndex,endIndex);
  }
  nextPage(){
    this.currentPage ++;
    this.updatePaginated();
  }

  prevPage(){
    this.currentPage --;
    this.updatePaginated();
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
