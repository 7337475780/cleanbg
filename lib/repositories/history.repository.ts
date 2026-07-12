import { HistoryItem, HistoryListResponse } from '@/types/history';

export interface HistoryRepository {
  getHistory(page: number, pageSize: number): Promise<HistoryListResponse>;
  deleteItem(id: string): Promise<void>;
}

export class MockHistoryRepository implements HistoryRepository {
  private mockItems: HistoryItem[] = Array.from({ length: 25 }).map((_, i) => ({
    id: `hist_${i}`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=150&auto=format&fit=crop',
    filename: `image_${i}.jpg`,
    uploadDate: new Date(Date.now() - i * 86400000).toISOString(),
    resolution: '1920x1080',
    status: 'completed',
    originalUrl: '#',
    processedUrl: '#',
    size: 2048576,
  }));

  async getHistory(page: number, pageSize: number): Promise<HistoryListResponse> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return {
      items: this.mockItems.slice(start, end),
      totalCount: this.mockItems.length,
      page,
      pageSize,
    };
  }

  async deleteItem(id: string): Promise<void> {
    this.mockItems = this.mockItems.filter(item => item.id !== id);
  }
}

export const historyRepository = new MockHistoryRepository();
