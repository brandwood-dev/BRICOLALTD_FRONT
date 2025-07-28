import { apiClient, ApiResponse } from '@/lib/api';

export interface RegisterRequest {
  email: string;
  password: string;
  type: 'ENTREPRISE' | 'PARTICULIER';
  firstName: string;
  lastName: string;
  country: string;
  prefix: string;
  address: string;
  phoneNumber: number;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
    country: string;
    createdAt: string;
  };
  token?: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
  };
  access_token: string;
  message: string;
}

class AuthService {
  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<RegisterResponse>('/auth/register', data);
  }

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    // Use credentials: 'include' to send/receive cookies
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || 'Login failed',
      };
    }
  }

  async logout(): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Logout failed' };
    }
  }

  /* async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/verify-email', { token });
  } */

  async verifyEmailWithCode(email: string, token: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/verify-email', { email, token });
  }

  async resendVerificationCode(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/resend-verification', { email });
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  }

  async verifyForgotPasswordCode(email: string, token: string): Promise<ApiResponse<{ message: string; resetToken?: string }>> {
    return apiClient.post<{ message: string; resetToken?: string }>('/auth/verify-forgot-password-token', { email, token });
  }

  async resetPassword(
    token: string, 
    password: string,
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.patch<{ message: string }>('/auth/reset-password', {
      token,
      password,
      email
    });
  }
}

export const authService = new AuthService();
