import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { apiService } from '@/services/api';
import { Tool, ToolCategory, ToolFormData } from '@/types/tool';

interface UseToolsReturn {
  tools: Tool[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageSize: number;
  categories: any[];
  subcategories: any[];
  isLoading: boolean;
  fetchTools: (params?: any) => Promise<void>;
  createTool: (formData: ToolFormData) => Promise<any>;
  getCategories: () => Promise<void>;
  getSubcategories: (category: string) => Promise<void>;
}

interface UseToolDetailsReturn {
  tool: Tool | null;
  loading: boolean;
  error: string | null;
  fetchTool: (id: string) => Promise<void>;
}

export const useTools = (): UseToolsReturn => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchTools = async (params?: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.getTools(params);
      setTools((response.data as Tool[]) || []);
      setTotal((response as any).total || 0);
      setPage((response as any).page || 1);
      setPageSize((response as any).pageSize || 12);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const getCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getCategories();
      setCategories((response.data as any[]) || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getSubcategories = useCallback(async (category: string) => {
    setIsLoading(true);
    try {
      const response = await apiService.getSubcategories(category);
      setSubcategories((response.data as any[]) || []);
    } catch (err) {
      console.error('Failed to fetch subcategories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subcategories');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTool = useCallback(async (formData: ToolFormData) => {
    setLoading(true);
    try {
      // Convert form data to FormData for file upload
      const data = new FormData();
      
      // Map frontend field names to backend field names with proper type conversion
      const fieldMappings: Record<string, any> = {
        title: formData.title,
        description: formData.description,
        category: formData.category.toUpperCase(), // Convert to uppercase
        subcategoryId: formData.subcategory || '', // Ensure subcategoryId is not empty
        condition: formData.condition.toUpperCase(), // Convert to uppercase
        basePrice: Number(formData.dailyRate), // Ensure it's a number
        weeklyRate: formData.weeklyRate ? Number(formData.weeklyRate) : undefined,
        monthlyRate: formData.monthlyRate ? Number(formData.monthlyRate) : undefined,
        depositAmount: formData.deposit ? Number(formData.deposit) : 0, // Ensure it's a number, default to 0
        pickupAddress: formData.location, // Map location to pickupAddress
        latitude: formData.latitude ? Number(formData.latitude) : 0,
        longitude: formData.longitude ? Number(formData.longitude) : 0,
        availabilityStatus: formData.availabilityStatus,
        brand: formData.brand,
        model: formData.model,
        year: formData.year ? Number(formData.year) : undefined, // Ensure it's a number
        ownerInstructions: formData.ownerInstructions
      };

      // Add mapped fields to FormData, only include defined and non-empty values
      Object.entries(fieldMappings).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          // For numeric fields, ensure they are valid numbers
          if (['basePrice', 'depositAmount', 'latitude', 'longitude', 'year'].includes(key)) {
            if (!isNaN(Number(value)) && Number(value) >= 0) {
              data.append(key, Number(value).toString());
            }
          } else {
            data.append(key, value.toString());
          }
        }
      });

      // Add photos
      if (formData.photos) {
        formData.photos.forEach((photo, index) => {
          data.append('photos', photo);
        });
      }

      const response = await apiService.createTool(data);
      
      toast({
        title: "Outil créé avec succès",
        description: "Votre outil a été ajouté et est en attente de validation.",
      });

      // Redirect to profile or tool details
      navigate('/profile');
      
      return response;
    } catch (error: any) {
      console.error('Error creating tool:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la création de l'outil.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast, navigate]);

  return {
    tools,
    loading,
    error,
    total,
    page,
    pageSize,
    categories,
    subcategories,
    isLoading,
    fetchTools,
    createTool,
    getCategories,
    getSubcategories,
  };
};

export const useToolDetails = (): UseToolDetailsReturn => {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchTool = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getTool(id);
      if (mountedRef.current) {
        setTool(response as Tool);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tool details');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    tool,
    loading,
    error,
    fetchTool,
  };
}; 