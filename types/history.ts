export interface HistoryItem {
  id: string;
  thumbnailUrl: string;
  filename: string;
  uploadDate: string;
  resolution: string;
  status: 'completed' | 'failed' | 'processing';
  originalUrl: string;
  processedUrl: string | null;
  size: number;
}

export interface HistoryListResponse {
  items: HistoryItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}
