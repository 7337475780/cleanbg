export interface Settings {
  general: {
    theme: 'system' | 'light' | 'dark';
    language: string;
  };
  appearance: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
  downloads: {
    defaultFormat: 'png' | 'webp' | 'jpg';
    preserveMetadata: boolean;
  };
  notifications: {
    emailAlerts: boolean;
    processingComplete: boolean;
  };
  privacy: {
    shareData: boolean;
  };
  api: {
    apiKey: string | null;
  };
}
