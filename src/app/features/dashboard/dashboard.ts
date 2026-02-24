import { Component, OnInit, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';

import { Jops } from '../../core/services/jops';
import { JobsApiResponse, Job } from '../../core/models/models';

import * as FavoritesActions from '../../store/favorites/favorites.actions';
import { selectFavoriteLevelSenior, selectFavorites } from '../../store/favorites/favorites.selectors';
import { FavoriteOffer } from '../../core/models/models'; 
import { FavoritesComponent } from '../favorites/favorites';

interface User {
  id: string | number; 
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, FavoritesComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  userLogining =
    localStorage.getItem('userLogining') ? JSON.parse(localStorage.getItem('userLogining')!) : null;

  jobs: Job[] = [];

  user: User = {
    id: this.userLogining?.id,
    name: this.userLogining?.name,
    email: this.userLogining?.email,
    firstName: this.userLogining?.firstName,
    lastName: this.userLogining?.lastName,
    avatar:
      'https://intranet.youcode.ma/storage/users/profile/thumbnail/1242-1727859879.JPG',
  };

  activeTab: string = 'search-jobs';
  isLoading: boolean = true;

  searchQuery: string = '';
  locationQuery: string = '';

  favorites$ = this.store.select(selectFavorites);

  constructor(
    public router: Router,
    private jobsService: Jops,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {


   

  


    const userId = this.getUserIdString();
    if (!userId) {
      this.isLoading = false;
      return;
    }

    this.store.dispatch(FavoritesActions.loadFavorites({ userId }));

    const jobs$ = this.jobsService.getAllJobs().pipe(
      map((response: JobsApiResponse) => response.results ?? [])
    );

    combineLatest([jobs$, this.favorites$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ([jobs, favorites]) => {
          this.jobs = jobs.map((job) => ({
            ...job,
            isLiked: favorites.some((f) => f.offerId === job.id && f.userId === userId),
          }));
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching jobs:', err);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  private getUserIdString(): string | null {
    const raw = localStorage.getItem('userLogining');
    if (!raw) return null;

    try {
      const user = JSON.parse(raw);
      const id = user?.id;
      if (id === undefined || id === null) return null;
      return String(id);
    } catch {
      return null;
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery, 'in', this.locationQuery);
  }

  viewJobDetails(jobId: number) {
    console.log('Viewing details for job ID:', jobId);
    this.router.navigate(['/job-details', jobId]);
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
    const userId = this.getUserIdString();
    if (!userId) return;

    let favoritesSnapshot: FavoriteOffer[] = [];
    this.favorites$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((favs) => (favoritesSnapshot = favs))
      .unsubscribe();

    const existing = favoritesSnapshot.find(
      (f) => f.userId === userId && f.offerId === job.id
    );

    if (!existing) {
      const payload: Omit<FavoriteOffer, 'id'> = {
        userId,
        offerId: job.id,
        title: (job as any)?.name ?? '',
        company: (job as any)?.company?.name ?? '',
        location: (job as any)?.locations?.[0]?.name ?? '',
        url: (job as any)?.refs?.landing_page ?? '',
        dateAdded: new Date().toISOString(),
      };

      this.store.dispatch(FavoritesActions.addFavorite({ favorite: payload }));
      return;
    }

    if (existing.id != null) {
      this.store.dispatch(FavoritesActions.removeFavorite({ favoriteId: existing.id }));
    }
  }
}