import { apiClient } from '@/lib/api/client';
import { historyRepository } from '@/lib/repositories/history.repository';
import { HistoryListResponse } from '@/types/history';
import { ApiResponse } from '@/types/api';

export class HistoryService {
  async getHistory(page = 1, pageSize = 12): Promise<ApiResponse<HistoryListResponse>> {
    try {
      const data = await historyRepository.getHistory(page, pageSize);
      return apiClient.mockRequest(data, false, 600);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'FETCH_ERROR', status: 500 } };
    }
  }

  async deleteItem(id: string): Promise<ApiResponse<void>> {
    try {
      await historyRepository.deleteItem(id);
      return apiClient.mockRequest(undefined, false, 400);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'DELETE_ERROR', status: 500 } };
    }
  }
}

export const historyService = new HistoryService();
