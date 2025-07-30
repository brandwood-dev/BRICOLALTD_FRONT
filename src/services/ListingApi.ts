const API_BASE_URL = 'http://localhost:3001';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  statusCode?: number;
}

class ListingApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('accessToken');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      // Check if response is empty
      const text = await response.text();
      if (!text) {
        throw new Error(`Empty response from server (${response.status})`);
      }

      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON response:', text);
        throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser() {
    return this.request('/users/me');
  }

  // Tools endpoints
  async createTool(toolData: FormData) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${this.baseURL}/tools`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, let the browser set it with boundary
        },
        body: toolData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Create tool request failed:', error);
      throw error;
    }
  }

  async getTools(params?: {
    category?: string;
    status?: string;
    availabilityStatus?: string;
    ownerId?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
    }

    const endpoint = `/tools${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getTool(id: string) {
    return this.request(`/tools/${id}`);
  }

  // Reviews endpoints
  async getToolReviews(toolId: string, page: number = 1, limit: number = 10) {
    return this.request(`/tools/${toolId}/reviews?page=${page}&limit=${limit}`);
  }

  async checkUserReview(toolId: string) {
    return this.request(`/tools/${toolId}/reviews/check`);
  }

  async createToolReview(toolId: string, reviewData: {
    rating: number;
    comment: string;
  }) {
    return this.request(`/tools/${toolId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async updateToolReview(toolId: string, reviewId: string, reviewData: {
    rating: number;
    comment: string;
  }) {
    return this.request(`/tools/${toolId}/reviews/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify(reviewData),
    });
  }

  async deleteToolReview(toolId: string, reviewId: string) {
    return this.request(`/tools/${toolId}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
  }

  // Reservation endpoints
  async createReservation(reservationData: {
    toolId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
  }) {
    return this.request('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }

  async getReservations(params?: {
    toolId?: string;
    userId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }

    const endpoint = `/reservations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request(endpoint);
  }

  // User verification
  async verifyUser(id: string) {
    return this.request(`/users/${id}/verify`, {
      method: 'PATCH',
    });
  }

  async updateTool(id: string, toolData: FormData) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const url = `${this.baseURL}/tools/${id}`;
    
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: toolData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Update tool request failed:', error);
      throw error;
    }
  }

  async deleteTool(id: string) {
    return this.request(`/tools/${id}`, {
      method: 'DELETE',
    });
  }

  async getCategories() {
    return this.request('/tools/categories');
  }

  async getSubcategories(category: string) {
    return this.request(`/tools/categories/${category}/subcategories`);
  }

  // Favorites endpoints
  async addToFavorites(toolId: string) {
    return this.request(`/favorites/${toolId}`, {
      method: 'POST',
    });
  }

  async removeFromFavorites(toolId: string) {
    return this.request(`/favorites/${toolId}`, {
      method: 'DELETE',
    });
  }

  async getUserFavorites() {
    return this.request('/favorites');
  }

  async getFavoritesCount() {
    return this.request('/favorites/count');
  }

  async checkIsFavorite(toolId: string) {
    return this.request(`/favorites/check/${toolId}`);
  }
}

export const listingApiService = new ListingApiService();
export default listingApiService; 