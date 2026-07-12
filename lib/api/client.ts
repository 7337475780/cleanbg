import { ApiResponse } from '@/types/api';

/**
 * Base API Client abstraction.
 * Currently configured to simulate network latency for a mock backend.
 */
class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  /**
   * Simulates a network delay.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Mock request handler that wraps responses in standard ApiResponse format.
   * In a real implementation, this would use fetch() or axios.
   */
  async mockRequest<T>(
    data: T,
    shouldFail = false,
    delayMs = 800
  ): Promise<ApiResponse<T>> {
    await this.delay(delayMs);

    if (shouldFail) {
      return {
        success: false,
        error: {
          message: 'An expected mock error occurred.',
          code: 'MOCK_ERROR',
          status: 500,
        },
      };
    }

    return {
      success: true,
      data,
    };
  }

  // Placeholder for future fetch implementation
  // async get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> { ... }
  // async post<T>(url: string, body: any, options?: RequestInit): Promise<ApiResponse<T>> { ... }
}

export const apiClient = new ApiClient();
