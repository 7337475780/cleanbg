import { HistoryItem, HistoryListResponse } from '@/types/history';
import { apiClient } from '../api/client';

export interface HistoryRepository {
  getHistory(page: number, pageSize: number): Promise<HistoryListResponse>;
  deleteItem(id: string): Promise<void>;
}

export class RestHistoryRepository implements HistoryRepository {
  async getHistory(page: number, pageSize: number): Promise<HistoryListResponse> {
    const response = await apiClient.get<any>(`/history?page=${page}&page_size=${pageSize}`);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch history');
    }
    
    // Map backend response to frontend expected format
    const items: HistoryItem[] = response.data.items.map((item: any) => ({
      id: item.id,
      thumbnailUrl: item.original_image_url || 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=150&auto=format&fit=crop',
      filename: `image_${item.id.substring(0, 8)}.jpg`, // Fallback
      uploadDate: item.created_at,
      resolution: 'Unknown',
      status: item.status.toLowerCase(),
      originalUrl: item.original_image_url,
      processedUrl: item.processed_image_url,
      size: 0, // Fallback
    }));

    return {
      items,
      totalCount: response.data.total,
      page: response.data.page,
      pageSize: response.data.page_size,
    };
  }

  async deleteItem(id: string): Promise<void> {
    const response = await apiClient.delete<any>(`/history/${id}`);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to delete item');
    }
  }
}

export const historyRepository = new RestHistoryRepository();
