import { createAction, props } from '@ngrx/store';
import { Job } from '../../core/models/models';



export const loadJobs = createAction('[Jobs] Load Jobs');
export const loadJobsSuccess = createAction(
  '[Jobs API] Load Jobs Success',
  props<{ jobs: Job[] }>()
);
export const loadJobsFailure = createAction(
  '[Jobs API] Load Jobs Failure',
  props<{ error: string }>()
);

export const selectJob = createAction(
  '[Jobs] Select Job',
  props<{ id: number }>()
);
