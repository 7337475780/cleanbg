import { User } from '@/types/user';
import { apiClient } from '../api/client';

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  signup(email: string, password: string, name: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

export class RestAuthRepository implements AuthRepository {
  async login(email: string, password: string): Promise<User> {
    const response = await apiClient.post<any>('/auth/login', { email, password });
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Login failed');
    }
    // Token is saved in apiClient via localStorage externally or we can set it here if we returned it directly,
    // but our apiClient expects the endpoint to return tokens and it doesn't automatically save unless it intercepts.
    // Wait, the apiClient refreshToken saves it, but login doesn't.
    // Let's manually save it.
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    
    // Now fetch the current user profile
    const userRes = await this.getCurrentUser();
    if (!userRes) throw new Error('Failed to fetch user profile');
    return userRes;
  }

  async signup(email: string, password: string, name: string): Promise<User> {
    const response = await apiClient.post<any>('/auth/signup', { email, password, name });
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Signup failed');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    const userRes = await this.getCurrentUser();
    if (!userRes) throw new Error('Failed to fetch user profile');
    return userRes;
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await apiClient.get<User>('/users/me');
    if (!response.success) {
      return null;
    }
    return response.data || null;
  }
}

// Export a singleton instance
export const authRepository = new RestAuthRepository();
