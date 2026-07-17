import { ProcessingJob } from '@/types/processing';
import { apiClient } from '../api/client';

export interface ProcessingRepository {
  createJob(file: File): Promise<ProcessingJob>;
  getJob(id: string): Promise<ProcessingJob | null>;
  cancelJob(id: string): Promise<void>;
  retryJob(id: string): Promise<string>;
}

export class RestProcessingRepository implements ProcessingRepository {
  async createJob(file: File): Promise<ProcessingJob> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<any>('/upload', formData);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to upload image');
    }
    
    return {
      id: response.data.job_id,
      status: response.data.status.toLowerCase(),
      progress: response.data.progress || 0,
      originalImage: URL.createObjectURL(file), // Still useful for immediate local preview
      processedImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getJob(id: string): Promise<ProcessingJob | null> {
    const response = await apiClient.get<any>(`/jobs/${id}`);
    if (!response.success || !response.data) {
      return null;
    }
    
    return {
      id: response.data.id,
      status: response.data.status.toLowerCase(),
      progress: response.data.progress || 0,
      originalImage: '', // The backend doesn't currently return the original image URL in the jobs endpoint directly, it uses the local preview in the UI state
      processedImage: response.data.output_image ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/preview/${response.data.id}` : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async cancelJob(id: string): Promise<void> {
    const response = await apiClient.post(`/jobs/${id}/cancel`);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to cancel job');
    }
  }

  async retryJob(id: string): Promise<string> {
    const response = await apiClient.post<any>(`/jobs/${id}/retry`);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to retry job');
    }
    return response.data.new_job_id;
  }
}

export const processingRepository = new RestProcessingRepository();
