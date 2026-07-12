import { apiClient } from '@/lib/api/client';
import { userRepository } from '@/lib/repositories/user.repository';
import { User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export class UserService {
  async getProfile(): Promise<ApiResponse<User | null>> {
    try {
      const user = await userRepository.getUserProfile();
      return apiClient.mockRequest(user, false, 300);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'USER_ERROR', status: 500 } };
    }
  }

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const updatedUser = await userRepository.updateProfile(data);
      return apiClient.mockRequest(updatedUser, false, 800);
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'USER_UPDATE_ERROR', status: 500 } };
    }
  }
}

export const userService = new UserService();
