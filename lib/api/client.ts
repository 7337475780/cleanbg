import { ApiResponse } from '@/types/api';

/**
 * Base API Client abstraction.
 * Handles automatic token refresh, interceptors, and error normalization.
 */
class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    // Fallback to localhost if not set, typical for development
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
  }

  /**
   * Helper to get token from localStorage
   */
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  private setTokens(access_token: string, refresh_token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
    }
  }

  private clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  /**
   * Core request logic with fetch
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = this.getToken();

    const headers: HeadersInit = {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    };
    // Fix for HeadersInit index signature error
    const headersObj: Record<string, string> = { ...headers as Record<string, string> };

    if (token) {
      headersObj['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: headersObj,
      });

      if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry original request
          const newToken = this.getToken();
          headersObj['Authorization'] = `Bearer ${newToken}`;
          const retryResponse = await fetch(url, { ...options, headers: headersObj });
          return this.handleResponse<T>(retryResponse);
        } else {
          this.clearTokens();
          // if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          //   window.location.href = '/login';
          // }
          return { success: false, error: { message: 'Session expired', code: 'UNAUTHORIZED', status: 401 } };
        }
      }

      return this.handleResponse<T>(response);
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Network Error',
          code: 'NETWORK_ERROR',
          status: 0,
        },
      };
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      let message = 'An error occurred';
      try {
        const errorData = await response.json();
        message = errorData.detail || errorData.message || message;
      } catch (e) {
        // ignore
      }
      return {
        success: false,
        error: {
          message,
          code: 'API_ERROR',
          status: response.status,
        },
      };
    }

    const data = await response.json();
    return { success: true, data };
  }

  private async refreshToken(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setTokens(data.access_token, data.refresh_token);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // Public Methods
  async get<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    let _body = body;
    let headers = options?.headers || {};
    
    // Support FormData
    if (body instanceof FormData) {
      _body = body;
      // Do not set Content-Type for FormData (fetch will do it with boundary)
      const { 'Content-Type': _, ...restHeaders } = headers as any;
      headers = restHeaders;
    } else if (body) {
      _body = JSON.stringify(body);
    }

    return this.request<T>(url, { ...options, method: 'POST', body: _body, headers });
  }

  async patch<T>(url: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined });
  }

  async delete<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
