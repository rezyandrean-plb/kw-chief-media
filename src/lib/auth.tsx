'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'realtor' | 'client' | 'admin';
  company?: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  getRedirectPath: (user: User) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for stored user data on app load
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with actual authentication
    if (email && password) {
      // Check if user has KW Singapore email for realtor access
      const isKWRealtor = email.endsWith('@kwsingapore.com');
      
      // Check for admin access (in real app, this would be validated against database)
      const isAdmin = email === 'isabelle@chiefmedia.sg' && password === 'admin123';
      
      let role: User['role'] = 'client';
      if (isAdmin) {
        role = 'admin';
      } else if (isKWRealtor) {
        role = 'realtor';
      }
      
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role,
      };
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    // Simulate API call - replace with actual registration
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  const getRedirectPath = (user: User): string => {
    // KW Singapore realtors should go to vendors page
    if (user.email.endsWith('@kwsingapore.com') && user.role === 'realtor') {
      return '/vendors';
    }
    
    // Admins go to admin dashboard
    if (user.role === 'admin') {
      return '/admin/enquiries';
    }
    
    // Default for clients and other users
    return '/admin';
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider value={{ user: null, login, signup, logout, loading: true, getRedirectPath }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, getRedirectPath }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 