import { Settings } from '@/types/settings';

export interface SettingsRepository {
  getSettings(): Promise<Settings>;
  updateSettings(updates: Partial<Settings>): Promise<Settings>;
}

export class MockSettingsRepository implements SettingsRepository {
  private defaultSettings: Settings = {
    general: { theme: 'system', language: 'en' },
    appearance: { reducedMotion: false, highContrast: false },
    downloads: { defaultFormat: 'png', preserveMetadata: true },
    notifications: { emailAlerts: true, processingComplete: true },
    privacy: { shareData: false },
    api: { apiKey: 'sk_test_1234567890abcdef' },
  };

  async getSettings(): Promise<Settings> {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cleanbg_settings');
      if (stored) return JSON.parse(stored);
    }
    return this.defaultSettings;
  }

  async updateSettings(updates: Partial<Settings>): Promise<Settings> {
    const current = await this.getSettings();
    const newSettings = { ...current, ...updates }; // Deep merge might be better in real app
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('cleanbg_settings', JSON.stringify(newSettings));
    }
    
    return newSettings;
  }
}

export const settingsRepository = new MockSettingsRepository();
