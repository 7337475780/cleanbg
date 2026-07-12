import { User } from '@/types/user';

export interface UserRepository {
  getUserProfile(): Promise<User | null>;
  updateProfile(data: Partial<User>): Promise<User>;
}

export class MockUserRepository implements UserRepository {
  async getUserProfile(): Promise<User | null> {
    const { authRepository } = await import('./auth.repository');
    return authRepository.getCurrentUser();
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const { authRepository } = await import('./auth.repository');
    const user = await authRepository.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    // In a real mock, we might update a global state or class property here.
    return { ...user, ...data };
  }
}

export const userRepository = new MockUserRepository();
