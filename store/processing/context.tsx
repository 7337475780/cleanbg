'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { processingReducer, initialProcessingState, ProcessingState } from './reducer';
import { processingService } from '@/lib/services/processing.service';
import { ProcessingJob } from '@/types/processing';

interface ProcessingContextType extends ProcessingState {
  processImage: (file: File) => Promise<void>;
  clearJob: () => void;
}

const ProcessingContext = createContext<ProcessingContextType | undefined>(undefined);

export function ProcessingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(processingReducer, initialProcessingState);

  const processImage = async (file: File) => {
    // Initial start logic handles the initial job state
    // In a real scenario, the service would return an initial job, then we subscribe
    
    // Create a temporary mock job for UI responsiveness while we wait for service
    const tempJob: ProcessingJob = {
      id: 'temp',
      status: 'idle',
      progress: 0,
      originalImage: URL.createObjectURL(file),
      processedImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    dispatch({ type: 'START_JOB', payload: tempJob });

    const response = await processingService.startProcessing(file, (updatedJob) => {
      dispatch({ type: 'UPDATE_JOB', payload: updatedJob });
      if (updatedJob.status === 'completed' || updatedJob.status === 'error') {
         dispatch({ type: 'END_JOB', payload: updatedJob });
      }
    });

    if (response.success && response.data) {
       // Only start if we didn't already finish
       if (state.currentJob?.status !== 'completed' && state.currentJob?.status !== 'error') {
          dispatch({ type: 'UPDATE_JOB', payload: response.data });
       }
    } else {
       dispatch({ 
         type: 'END_JOB', 
         payload: { 
           ...tempJob, 
           status: 'error', 
           error: response.error?.message || 'Failed to start processing'
         } 
       });
    }
  };

  const clearJob = () => {
    dispatch({ type: 'CLEAR_CURRENT_JOB' });
  };

  return (
    <ProcessingContext.Provider value={{ ...state, processImage, clearJob }}>
      {children}
    </ProcessingContext.Provider>
  );
}

export function useProcessing() {
  const context = useContext(ProcessingContext);
  if (context === undefined) {
    throw new Error('useProcessing must be used within a ProcessingProvider');
  }
  return context;
}
