import { apiClient } from '@/lib/api/client';
import { processingRepository, MockProcessingRepository } from '@/lib/repositories/processing.repository';
import { ProcessingJob } from '@/types/processing';
import { ApiResponse } from '@/types/api';

export class ProcessingService {
  
  async startProcessing(file: File, onProgress?: (job: ProcessingJob) => void): Promise<ApiResponse<ProcessingJob>> {
    try {
      const job = await processingRepository.createJob(file);
      
      // Simulate backend processing pipeline
      this.simulatePipeline(job.id, onProgress);
      
      return apiClient.mockRequest(job, false, 500);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'PROCESS_ERROR', status: 500 } };
    }
  }

  async getJobStatus(id: string): Promise<ApiResponse<ProcessingJob | null>> {
    const job = await processingRepository.getJob(id);
    return apiClient.mockRequest(job, false, 100);
  }

  private async simulatePipeline(jobId: string, onProgress?: (job: ProcessingJob) => void) {
    const repo = processingRepository as MockProcessingRepository;
    
    const steps: { status: ProcessingJob['status'], duration: number, progress: number }[] = [
      { status: 'uploading', duration: 800, progress: 10 },
      { status: 'queued', duration: 1000, progress: 20 },
      { status: 'pre-processing', duration: 600, progress: 40 },
      { status: 'inference', duration: 2000, progress: 70 },
      { status: 'post-processing', duration: 800, progress: 85 },
      { status: 'generating-alpha', duration: 500, progress: 95 },
      { status: 'completed', duration: 200, progress: 100 },
    ];

    for (const step of steps) {
      const currentJob = await repo.getJob(jobId);
      if (!currentJob || currentJob.status === 'error') break; // Cancelled or failed

      repo._updateJobStatus(jobId, { status: step.status, progress: step.progress });
      const updatedJob = await repo.getJob(jobId);
      if (updatedJob && onProgress) {
        onProgress(updatedJob);
      }
      
      await new Promise(resolve => setTimeout(resolve, step.duration));
    }
    
    // Finalize with a mock processed image
    const finalJob = await repo.getJob(jobId);
    if (finalJob && finalJob.status === 'completed') {
      repo._updateJobStatus(jobId, { 
        processedImage: '/images/mock-processed.png' // In a real app, this would be a real URL
      });
      if (onProgress) {
        onProgress(await repo.getJob(jobId) as ProcessingJob);
      }
    }
  }
}

export const processingService = new ProcessingService();
