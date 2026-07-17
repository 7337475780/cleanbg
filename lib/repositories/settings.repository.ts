import { Settings } from '@/types/settings';
import { apiClient } from '../api/client';

export interface SettingsRepository {
  getSettings(): Promise<Settings>;
  updateSettings(updates: Partial<Settings>): Promise<Settings>;
}

export class RestSettingsRepository implements SettingsRepository {
  private defaultSettings: Settings = {
    general: { theme: 'system', language: 'en' },
    appearance: { reducedMotion: false, highContrast: false },
    downloads: { defaultFormat: 'png', preserveMetadata: true },
    notifications: { emailAlerts: true, processingComplete: true },
    privacy: { shareData: false },
    api: { apiKey: '' },
  };

  async getSettings(): Promise<Settings> {
    const response = await apiClient.get<any>('/settings');
    if (!response.success || !response.data) {
      // Return default if error
      return this.defaultSettings;
    }
    
    // Map backend response to frontend expected format
    return {
      general: { theme: response.data.theme || 'system', language: 'en' },
      appearance: { reducedMotion: false, highContrast: false },
      downloads: { defaultFormat: response.data.default_format || 'png', preserveMetadata: true },
      notifications: { emailAlerts: response.data.notifications !== false, processingComplete: true },
      privacy: { shareData: response.data.privacy !== false },
      api: { apiKey: '' }, // we can fetch API keys separately
    };
  }

  async updateSettings(updates: Partial<Settings>): Promise<Settings> {
    const payload = {
      theme: updates.general?.theme,
      download_quality: 'high',
      default_format: updates.downloads?.defaultFormat,
      notifications: updates.notifications?.emailAlerts,
      privacy: updates.privacy?.shareData,
    };
    
    const response = await apiClient.patch<any>('/settings', payload);
    if (!response.success) {
      throw new Error(response.error?.message || 'Failed to update settings');
    }
    
    return this.getSettings();
  }
}

export const settingsRepository = new RestSettingsRepository();
