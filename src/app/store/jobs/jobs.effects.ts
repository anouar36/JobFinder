import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as JobsActions from './jobs.actions';
import { Jops } from '../../core/services/jops';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { JobsApiResponse } from '../../core/models/models';

@Injectable()
export class JobsEffects {
  private actions$ = inject(Actions);
  private jobsService = inject(Jops);

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobsActions.loadJobs),
      switchMap(() =>
        this.jobsService.getAllJobs().pipe(
          map((res: JobsApiResponse) => JobsActions.loadJobsSuccess({ jobs: res.results })),
          catchError(() => of(JobsActions.loadJobsFailure({ error: 'error loading jobs' })))
        )
      )
    )
  );
}
