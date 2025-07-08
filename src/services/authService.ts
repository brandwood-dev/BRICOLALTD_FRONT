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
  token: string;
  message: string;
}

class AuthService {
  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return apiClient.post<RegisterResponse>('/auth/register', data);
  }

  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return apiClient.post<LoginResponse>('/auth/login', data);
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

  async resetPassword(
    token: string, 
    password: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/auth/reset-password', {
      token,
      password
    });
  }
}

export const authService = new AuthService();
