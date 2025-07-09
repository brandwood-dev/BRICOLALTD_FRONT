import { apiClient, ApiResponse } from '@/lib/api';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  country: string;
  prefix: string;
  userType: 'ENTREPRISE' | 'PARTICULIER';
  address: string;
  profilePicture: string | null;
  idCardFront: string | null;
  idCardBack: string | null;
  createdAt: string;
  role: string;
  verified: boolean;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  prefix?: string;
  country?: string;
  address?: string;
  
}

export interface UserStats {
  totalEarnings: number;
  activeAds: number;
  totalRentals: number;
  rating: number;
}

export interface UserMeResponse {
  user: UserProfile;
  stats: UserStats;
}

class UserService {
  async getMe(token: string): Promise<ApiResponse<UserProfile>> {
    return apiClient.get<UserProfile>('/users/me', {
      Authorization: `Bearer ${token}`,
    });
  }

  async updateUser(
    token: string,
    data: UpdateUserRequest
  ): Promise<ApiResponse<UserProfile>> {
    return apiClient.patch<UserProfile>('/users', data, {
      Authorization: `Bearer ${token}`,
    });
  }

  async uploadProfilePicture(token: string, file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.patch<any>('/users/profile-picture', formData, {
      Authorization: `Bearer ${token}`,
      
    });
  }
}

export const userService = new UserService();
