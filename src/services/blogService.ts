import { apiClient, ApiResponse } from '@/lib/api';

// Interface based on the API response structure
export interface BlogPost {
  _id: string;
  title: string;
  author: string;
  readTime: number;
  category: string;
  coverImageUrl: string;
  sections: BlogSection[];
  createdAt: string;
  excerpt: string;
  updatedAt: string;
  __v: number;
}

export interface BlogSection {
  type: 'title' | 'paragraph' | 'video' | 'image';
  content: string;
  metadata?: {
    caption?: string;
    alt?: string;
  };
}

export interface BlogResponse {
  data: BlogPost[];
  total: number;
  page: string;
  lastPage: number;
}

// Interface for the frontend display (adapted from existing structure)
export interface DisplayBlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export class BlogService {
  async getBlogPosts(page: number = 1, limit: number = 10, category?: string): Promise<ApiResponse<BlogResponse>> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      if (category) {
        params.append('category', category);
      }
      
      const response = await apiClient.get<BlogResponse>(`/blog?${params.toString()}`);
      
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch blog posts'
      };
    }
  }

  async getBlogPostById(id: string): Promise<ApiResponse<BlogPost>> {
    try {
      const response = await apiClient.get<BlogPost>(`/blog/${id}`);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: response.data
        };
      }
      
      return {
        success: false,
        error: response.error || 'Failed to fetch blog post'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch blog post'
      };
    }
  }

  async getBlogCategories(): Promise<ApiResponse<string[]>> {
    try {
      const response = await apiClient.get<string[]>('/blog/categories');
      return response;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch categories'
      };
    }
  }

  // Transform API blog post to display format
  transformToDisplayPost(apiPost: BlogPost): DisplayBlogPost {
    return {
      id: apiPost._id,
      title: apiPost.title,
      excerpt: apiPost.excerpt,
      author: apiPost.author,
      date: apiPost.createdAt,
      category: apiPost.category,
      image: apiPost.coverImageUrl,
      readTime: `${apiPost.readTime} min`
    };
  }
}

export const blogService = new BlogService();
