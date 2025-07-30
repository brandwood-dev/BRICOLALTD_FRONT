export type ToolCategory = 
  | 'JARDINAGE'
  | 'BRICOLAGE'
  | 'TRANSPORT'
  | 'NETTOYAGE'
  | 'EVENEMENTIEL';

export type ToolStatus = 
  | 'EN_ATTENTE'
  | 'PUBLIE'
  | 'REJETE'
  | 'SUSPENDU';

export type AvailabilityStatus = 
  | 'DISPONIBLE'
  | 'RESERVE'
  | 'SUSPENDU'
  | 'EN_ATTENTE';

export type ToolCondition = 
  | 'NEUF'
  | 'TRES_BON'
  | 'BON'
  | 'MOYEN'
  | 'MAUVAIS';

export interface ToolPhoto {
  id: string;
  url: string;
  filename: string;
  isPrimary: boolean;
}

export interface ToolPricing {
  id: string;
  duration: number;
  discount: number;
  finalPrice: number;
}

export interface ToolAvailability {
  id: string;
  date: string;
  isAvailable: boolean;
}

export interface ToolOwner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  prefix: string;
  isVerified: boolean;
}

export interface ToolCategoryInfo {
  id: string;
  name: ToolCategory;
  displayName: string;
  description?: string;
}

export interface ToolSubcategory {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

export interface ToolReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
  };
  reviewer?: {
    firstName: string;
    lastName: string;
  };
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface CreateToolData {
  title: string;
  description: string;
  category: ToolCategory;
  subcategoryId: string;
  condition: ToolCondition;
  basePrice: number;
  depositAmount: number;
  pickupAddress: string;
  latitude?: number;
  longitude?: number;
  ownerInstructions?: string;
  brand?: string;
  model?: string;
  year?: number;
  availabilityDates?: Date[];
  photos?: File[];
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  brand?: string;
  model?: string;
  year?: number;
  condition: ToolCondition;
  pickupAddress: string;
  latitude?: number;
  longitude?: number;
  ownerInstructions?: string;
  basePrice: number;
  depositAmount: number;
  ownerId: string;
  publicationStatus: ToolStatus;
  availabilityStatus: AvailabilityStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  moderatedAt?: string;
  
  // Relations
  owner: ToolOwner;
  category: ToolCategoryInfo;
  subcategory: ToolSubcategory;
  photos: ToolPhoto[];
  pricing: ToolPricing[];
  availability: ToolAvailability[];
  reviewStats?: ReviewStats;
  _count?: {
    reservations: number;
    reviews: number;
  };
}

export interface ToolFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  condition: string;
  dailyRate: number;
  weeklyRate?: number;
  monthlyRate?: number;
  deposit?: number;
  location: string;
  latitude?: number;
  longitude?: number;
  availabilityStatus: string;
  brand?: string;
  model?: string;
  year?: number;
  ownerInstructions?: string;
  photos?: File[];
} 