import { User } from '@/types/user';
import { apiClient } from '../api/client';

export interface UserRepository {
  getUserProfile(): Promise<User | null>;
  updateProfile(data: Partial<User>): Promise<User>;
  getDashboardStats(): Promise<any>;
}

export class RestUserRepository implements UserRepository {
  async getUserProfile(): Promise<User | null> {
    const response = await apiClient.get<User>('/users/me');
    if (!response.success) {
      return null;
    }
    return response.data || null;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>('/users/me/profile', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to update profile');
    }
    return response.data;
  }

  async getDashboardStats(): Promise<any> {
    const response = await apiClient.get<any>('/users/me/dashboard');
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Failed to fetch dashboard stats');
    }
    return response.data;
  }
}

export const userRepository = new RestUserRepository();
