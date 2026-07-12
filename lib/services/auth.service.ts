import { apiClient } from '@/lib/api/client';
import { authRepository } from '@/lib/repositories/auth.repository';
import { User } from '@/types/user';
import { ApiResponse } from '@/types/api';

export class AuthService {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      // In a real app, the repository might throw if unauthenticated, 
      // but the service layer catches and maps to standard responses.
      // Here we simulate the network request wrapping the repository call.
      
      const user = await authRepository.login(email, password);
      return apiClient.mockRequest(user, false, 1200); // Simulate network delay
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Login failed',
          code: 'AUTH_FAILED',
          status: 401,
        }
      };
    }
  }

  async signup(email: string, password: string, name: string): Promise<ApiResponse<User>> {
    try {
      const user = await authRepository.signup(email, password, name);
      return apiClient.mockRequest(user, false, 1500);
    } catch (error: any) {
      return {
        success: false,
        error: { message: error.message, code: 'SIGNUP_FAILED', status: 400 }
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    await authRepository.logout();
    return apiClient.mockRequest(undefined, false, 500);
  }

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    const user = await authRepository.getCurrentUser();
    return apiClient.mockRequest(user, false, 300);
  }
}

export const authService = new AuthService();
