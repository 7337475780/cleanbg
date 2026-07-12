import { User } from '@/types/user';

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  signup(email: string, password: string, name: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

export class MockAuthRepository implements AuthRepository {
  private mockUser: User = {
    id: 'usr_123',
    name: 'Jane Doe',
    email: 'jane@example.com',
    plan: 'pro',
    usage: {
      processedImages: 142,
      remainingCredits: 858,
      storageUsed: 1024 * 1024 * 50, // 50MB
      storageLimit: 1024 * 1024 * 1024 * 5, // 5GB
    },
    joinDate: new Date().toISOString(),
  };

  async login(email: string, password: string): Promise<User> {
    if (email === 'test@example.com' && password === 'password') {
      return this.mockUser;
    }
    throw new Error('Invalid credentials');
  }

  async signup(email: string, password: string, name: string): Promise<User> {
    return { ...this.mockUser, name, email };
  }

  async logout(): Promise<void> {
    // Clear local session data in a real app
    return Promise.resolve();
  }

  async getCurrentUser(): Promise<User | null> {
    return this.mockUser;
  }
}

// Export a singleton instance
export const authRepository = new MockAuthRepository();
