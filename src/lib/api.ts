interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private readonly baseURL: string;
  private isRefreshing = false;
  private refreshPromise: Promise<boolean> | null = null;

  constructor(baseURL: string = 'http://localhost:3001') {
    this.baseURL = baseURL;
  }

  private async refreshToken(): Promise<boolean> {
    if (this.isRefreshing && this.refreshPromise) {
      return await this.refreshPromise;
    }

    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  private async performRefresh(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Include cookies (refresh token)
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          // Update token in localStorage
          localStorage.setItem('access_token', data.access_token);
          
          // Update user data if provided
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          
          // Trigger auth context update
          window.dispatchEvent(new CustomEvent('tokenRefreshed', { 
            detail: { access_token: data.access_token, user: data.user } 
          }));
          
          return true;
        }
      }
      
      // If refresh fails, logout user
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('tokenRefreshFailed'));
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('tokenRefreshFailed'));
      return false;
    }
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      
      const defaultHeaders: HeadersInit = {};
      
      // Only add Content-Type for non-FormData requests
      if (!(options.body instanceof FormData)) {
        defaultHeaders['Content-Type'] = 'application/json';
      }

      // Add auth token if available
      const token = localStorage.getItem('access_token');
      if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
      }

      const config: RequestInit = {
        ...options,
        credentials: 'include', // Include cookies for refresh token
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      };

      let response = await fetch(url, config);
      
      // If token expired (401), try to refresh
      if (response.status === 401 && token) {
        const refreshSuccess = await this.refreshToken();
        
        if (refreshSuccess) {
          // Retry the request with new token
          const newToken = localStorage.getItem('access_token');
          if (newToken) {
            config.headers = {
              ...config.headers,
              'Authorization': `Bearer ${newToken}`,
            };
            response = await fetch(url, config);
          }
        }
      }
      
      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        return {
          success: false,
          error: data?.message ?? data?.error ?? `HTTP error! status: ${response.status}`,
          data: data
        };
      }

      return {
        success: true,
        data: data,
        message: data?.message
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  async get<T>(endpoint: string, headers?: HeadersInit): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
      headers,
    });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const config: RequestInit = {
      method: 'POST',
      headers,
    };

    if (data instanceof FormData) {
      config.body = data;
    } else {
      config.body = data ? JSON.stringify(data) : undefined;
    }

    return this.makeRequest<T>(endpoint, config);
  }

  async put<T>(
    endpoint: string,
    data?: any,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> {
    const config: RequestInit = {
      method: 'PATCH',
      headers,
    };

    if (data instanceof FormData) {
      config.body = data;
    } else {
      config.body = data ? JSON.stringify(data) : undefined;
    }

    return this.makeRequest<T>(endpoint, config);
  }

  async delete<T>(
    endpoint: string,
    headers?: HeadersInit
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}


export const apiClient = new ApiClient();


export type { ApiResponse };
