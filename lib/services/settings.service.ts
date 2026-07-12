import { apiClient } from '@/lib/api/client';
import { settingsRepository } from '@/lib/repositories/settings.repository';
import { Settings } from '@/types/settings';
import { ApiResponse } from '@/types/api';

export class SettingsService {
  async getSettings(): Promise<ApiResponse<Settings>> {
    try {
      const settings = await settingsRepository.getSettings();
      return apiClient.mockRequest(settings, false, 400);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'SETTINGS_ERROR', status: 500 } };
    }
  }

  async updateSettings(updates: Partial<Settings>): Promise<ApiResponse<Settings>> {
    try {
      const newSettings = await settingsRepository.updateSettings(updates);
      return apiClient.mockRequest(newSettings, false, 600);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'SETTINGS_UPDATE_ERROR', status: 500 } };
    }
  }
}

export const settingsService = new SettingsService();
