export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
  usage: {
    processedImages: number;
    remainingCredits: number;
    storageUsed: number;
    storageLimit: number;
  };
  joinDate: string;
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string;
}
