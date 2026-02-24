import { Job } from '../../core/models/models';

export interface JobsState {
  jobs: Job[];
  selectedJob: Job | null;
  loading: boolean;
}

export const initialState: JobsState = {
  jobs: [],
  selectedJob: null,
  loading: false
};

