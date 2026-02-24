import { createReducer, on } from '@ngrx/store';
import { initialState } from './jobs.state';
import * as JobsActions from './jobs.actions';

export const jobsReducer = createReducer(
  initialState,

  on(JobsActions.loadJobs, state => ({
    ...state,
    loading: true,
  })),

  on(JobsActions.loadJobsSuccess, (state, { jobs }) => ({
    ...state,
    jobs,
    loading: false,
  })),

  on(JobsActions.loadJobsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(JobsActions.selectJob, (state, { id }) => ({
    ...state,
    selectedJob: state.jobs.find(j => j.id === id) || null,
  }))
);
