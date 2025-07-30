
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import listingApiService from '@/services/ListingApi';

interface FavoriteTool {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  photos: Array<{ url: string; filename: string; isPrimary: boolean }>;
  pickupAddress: string;
  category: { name: string; displayName: string };
  subcategory: { name: string; displayName: string };
  owner: { firstName: string; lastName: string; isVerified: boolean };
  availabilityStatus: string;
  condition: string;
  createdAt: string;
  reviewStats: {
    averageRating: number;
    totalReviews: number;
  };
}

interface FavoritesContextType {
  favorites: FavoriteTool[];
  addToFavorites: (toolId: string) => Promise<void>;
  removeFromFavorites: (toolId: string) => Promise<void>;
  isFavorite: (toolId: string) => boolean;
  favoritesCount: number;
  loading: boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteTool[]>([]);
  const [loading, setLoading] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshFavorites = async () => {
    if (isRefreshing) {
      return;
    }
    
    try {
      setIsRefreshing(true);
      setLoading(true);
      const response = await listingApiService.getUserFavorites();
      console.log('Favorites API response:', response);
      setFavorites((response as FavoriteTool[]) || []);
      
              const countResponse = await listingApiService.getFavoritesCount();
      console.log('Count API response:', countResponse);
      setFavoritesCount((countResponse as any).count || 0);
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      // Don't update state on error to prevent infinite loops
      if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
        // Clear favorites if user is not authenticated
        setFavorites([]);
        setFavoritesCount(0);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    // Check if user is authenticated before fetching favorites
    const token = localStorage.getItem('accessToken');
    console.log('FavoritesContext: Token exists:', !!token);
    if (token) {
      refreshFavorites();
    } else {
      console.log('FavoritesContext: No token found, user not logged in');
      // Clear favorites if no token
      setFavorites([]);
      setFavoritesCount(0);
    }
  }, []);

  const addToFavorites = async (toolId: string) => {
    try {
      console.log('Adding to favorites:', toolId);
      await listingApiService.addToFavorites(toolId);
      console.log('Successfully added to favorites, refreshing...');
      await refreshFavorites();
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      // If it's already in favorites (409), refresh to update state
      if (error.message?.includes('already in favorites') || error.statusCode === 409) {
        console.log('Tool already in favorites, refreshing state...');
        await refreshFavorites();
        return; // Don't throw error, just refresh state
      }
      throw error;
    }
  };

  const removeFromFavorites = async (toolId: string) => {
    try {
      console.log('Removing from favorites:', toolId);
      await listingApiService.removeFromFavorites(toolId);
      console.log('Successfully removed from favorites, refreshing...');
      await refreshFavorites();
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  };

  const isFavorite = (toolId: string) => {
    const isFav = favorites.some(fav => fav.id === toolId);
    console.log(`Checking if ${toolId} is favorite:`, isFav, 'Total favorites:', favorites.length, 'Favorites IDs:', favorites.map(f => f.id));
    return isFav;
  };



  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      favoritesCount,
      loading,
      refreshFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
