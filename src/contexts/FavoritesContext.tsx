
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tool {
  id: string;
  title: string;
  price: number;
  images: string[];
  location: string;
  rating: number;
  category: string;
}

interface FavoritesContextType {
  favorites: Tool[];
  addToFavorites: (tool: Tool) => void;
  removeFromFavorites: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  favoritesCount: number;
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
  const [favorites, setFavorites] = useState<Tool[]>([]);

  const addToFavorites = (tool: Tool) => {
    setFavorites(prev => {
      if (prev.find(fav => fav.id === tool.id)) {
        return prev;
      }
      return [...prev, tool];
    });
  };

  const removeFromFavorites = (toolId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== toolId));
  };

  const isFavorite = (toolId: string) => {
    return favorites.some(fav => fav.id === toolId);
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      favoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
