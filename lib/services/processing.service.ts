import { apiClient } from '@/lib/api/client';
import { processingRepository } from '@/lib/repositories/processing.repository';
import { ProcessingJob } from '@/types/processing';
import { ApiResponse } from '@/types/api';

export class ProcessingService {

  async startProcessing(file: File, onProgress?: (job: ProcessingJob) => void): Promise<ApiResponse<ProcessingJob>> {
    try {
      const job = await processingRepository.createJob(file);
      if (onProgress) onProgress(job);

      // Start polling
      if (onProgress) {
        const jobId = job.id;
        const startTime = Date.now();
        const timeoutMs = 10 * 60 * 1000; // 10 minutes

        const poll = async () => {
          if (Date.now() - startTime > timeoutMs) {
            onProgress({ ...job, status: 'error' });
            return;
          }

          try {
            const updatedJob = await processingRepository.getJob(jobId);
            if (updatedJob) {
              onProgress(updatedJob);
              
              if (['completed', 'failed', 'error', 'cancelled'].includes(updatedJob.status)) {
                return; // Stop polling
              }
            }
          } catch (e: any) {
            console.error('Polling error', e);
            onProgress({ 
              ...job, 
              status: 'error', 
              progress: 0, 
              error: 'Processing failed' 
            });
            return; // Stop polling on error
          }

          setTimeout(poll, 1000);
        };

        setTimeout(poll, 1000);
      }

      return { success: true, data: job };
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'PROCESS_ERROR', status: 500 } };
    }
  }

  async getJobStatus(id: string): Promise<ApiResponse<ProcessingJob | null>> {
    try {
      const job = await processingRepository.getJob(id);
      return { success: true, data: job };
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'STATUS_ERROR', status: 500 } };
    }
  }

  async cancelJob(id: string): Promise<ApiResponse<void>> {
    try {
      await processingRepository.cancelJob(id);
      return { success: true, data: undefined };
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'CANCEL_ERROR', status: 500 } };
    }
  }

  async retryJob(id: string): Promise<ApiResponse<string>> {
    try {
      const newJobId = await processingRepository.retryJob(id);
      return { success: true, data: newJobId };
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'RETRY_ERROR', status: 500 } };
    }
  }
}

export const processingService = new ProcessingService();
