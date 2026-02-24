import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../core/models/models';
import { CommonModule } from '@angular/common';
import { Jops } from '../../core/services/jops';
import { SafeHtmlPipe } from '../../core/pipes/safe-html.pipe.ts-pipe';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.html',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  styleUrls: ['./job-details.css']
})
export class JobDetailsComponent implements OnInit {

  job: Job | null = null;
  isLoading: boolean = true;
  jobId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobsService: Jops,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit() {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Loading job with ID:', this.jobId);
    
    this.jobsService.getAllJobs().subscribe({
      next: (response) => {
        this.job = response.results.find(j => j.id === this.jobId) || null;
        this.isLoading = false;
        console.log('Job loaded:', this.job);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error loading job:', err);
        this.isLoading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  goBack() {
    window.history.back();
  }

  applyNow() {
    if (this.job?.refs?.landing_page) {
      window.open(this.job.refs.landing_page, '_blank');
    } else {
      alert('Application link is not available for this job.');
    }
  }
}
