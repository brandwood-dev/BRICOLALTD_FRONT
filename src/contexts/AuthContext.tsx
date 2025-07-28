import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
}

interface AuthContextType {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (access_token: string, user: User) => void;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for token refresh events
  useEffect(() => {
    const handleTokenRefreshed = (event: CustomEvent) => {
      const { access_token, user } = event.detail;
      setAccessToken(access_token);
      if (user) {
        setUser(user);
      }
    };

    const handleTokenRefreshFailed = () => {
      logout();
    };

    window.addEventListener('tokenRefreshed', handleTokenRefreshed as EventListener);
    window.addEventListener('tokenRefreshFailed', handleTokenRefreshFailed);

    return () => {
      window.removeEventListener('tokenRefreshed', handleTokenRefreshed as EventListener);
      window.removeEventListener('tokenRefreshFailed', handleTokenRefreshFailed);
    };
  }, []);

  // Check for existing auth data on app startup
  useEffect(() => {
    const savedToken = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAccessToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        // Clear corrupted data
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newAccessToken: string, newUser: User) => {
    setAccessToken(newAccessToken);
    setUser(newUser);
    localStorage.setItem('access_token', newAccessToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    
    // Call backend logout endpoint to clear refresh token cookie
    fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).catch(console.error);
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch('/auth/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          login(data.access_token, data.user || user);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  };

  const value: AuthContextType = useMemo(() => ({
    user,
    access_token: accessToken,
    isAuthenticated: !!accessToken && !!user,
    isLoading,
    login,
    logout,
    refreshToken,
  }), [user, accessToken, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
