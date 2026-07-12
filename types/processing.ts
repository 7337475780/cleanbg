export interface ProcessingJob {
  id: string;
  status: 'idle' | 'uploading' | 'queued' | 'pre-processing' | 'inference' | 'post-processing' | 'generating-alpha' | 'encoding-png' | 'completed' | 'error';
  progress: number;
  originalImage: string | null; // URL or object URL
  processedImage: string | null; // URL or object URL
  error?: string;
  createdAt: string;
  updatedAt: string;
}
