import { ProcessingJob } from '@/types/processing';


export interface ProcessingRepository {
  createJob(file: File): Promise<ProcessingJob>;
  getJob(id: string): Promise<ProcessingJob | null>;
  cancelJob(id: string): Promise<void>;
}

export class MockProcessingRepository implements ProcessingRepository {
  private jobs: Map<string, ProcessingJob> = new Map();

  async createJob(file: File): Promise<ProcessingJob> {
    const newJob: ProcessingJob = {
      id: crypto.randomUUID(),
      status: 'idle',
      progress: 0,
      originalImage: URL.createObjectURL(file), // Mock URL
      processedImage: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    this.jobs.set(newJob.id, newJob);
    return newJob;
  }

  async getJob(id: string): Promise<ProcessingJob | null> {
    return this.jobs.get(id) || null;
  }

  async cancelJob(id: string): Promise<void> {
    const job = this.jobs.get(id);
    if (job) {
      job.status = 'error';
      job.error = 'Job cancelled by user';
      job.updatedAt = new Date().toISOString();
    }
  }

  // Mock internal update for simulating progress
  _updateJobStatus(id: string, updates: Partial<ProcessingJob>) {
    const job = this.jobs.get(id);
    if (job) {
      Object.assign(job, updates, { updatedAt: new Date().toISOString() });
    }
  }
}

export const processingRepository = new MockProcessingRepository();
