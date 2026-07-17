import { ProcessingJob } from '@/types/processing';

export interface ProcessingState {
  currentJob: ProcessingJob | null;
  jobHistory: ProcessingJob[];
  isProcessing: boolean;
}

export const initialProcessingState: ProcessingState = {
  currentJob: null,
  jobHistory: [],
  isProcessing: false,
};

export type ProcessingAction =
  | { type: 'START_JOB'; payload: ProcessingJob }
  | { type: 'UPDATE_JOB'; payload: ProcessingJob }
  | { type: 'END_JOB'; payload: ProcessingJob }
  | { type: 'CLEAR_CURRENT_JOB' };

export function processingReducer(state: ProcessingState, action: ProcessingAction): ProcessingState {
  switch (action.type) {
    case 'START_JOB':
      return {
        ...state,
        currentJob: action.payload,
        isProcessing: true,
      };
    case 'UPDATE_JOB':
      return {
        ...state,
        currentJob: (state.currentJob?.id === action.payload.id || state.currentJob?.id === 'temp') ? action.payload : state.currentJob,
        // Also update in history if it exists
        jobHistory: state.jobHistory.map(job => job.id === action.payload.id ? action.payload : job)
      };
    case 'END_JOB':
      return {
        ...state,
        currentJob: (state.currentJob?.id === action.payload.id || state.currentJob?.id === 'temp') ? action.payload : state.currentJob,
        isProcessing: false,
        jobHistory: [action.payload, ...state.jobHistory.filter(job => job.id !== action.payload.id)]
      };
    case 'CLEAR_CURRENT_JOB':
      return {
        ...state,
        currentJob: null,
        isProcessing: false,
      };
    default:
      return state;
  }
}
