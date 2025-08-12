'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

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
  loginWithEmailCode: (email: string, code: string) => Promise<boolean>;
  sendVerificationCode: (email: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  getRedirectPath: (user: User) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Handle NextAuth session
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      // Convert NextAuth session to our User format
      const authUser: User = {
        id: session.user.id || 'unknown',
        email: session.user.email || '',
        name: session.user.name || '',
        role: (session.user.role as 'realtor' | 'client' | 'admin') || 'client',
        avatar: session.user.image || undefined,
      };
      setUser(authUser);
      
      // Store in localStorage for backward compatibility
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(authUser));
      }
    } else {
      // Check for stored user data on app load (fallback for existing users)
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
    }
    
    setLoading(false);
  }, [session, status]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Legacy login method - for demo purposes only
    if (email && password) {
      // Check if user has KW Singapore or Property Lim Brothers email for realtor access
      const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
      const isRealtor = allowedDomains.some(domain => email.endsWith(domain));
      
      // Check for admin access (in real app, this would be validated against database)
      const isAdmin = email === 'isabelle@chiefmedia.sg' && password === 'admin123';
      
      let role: User['role'] = 'client';
      if (isAdmin) {
        role = 'admin';
      } else if (isRealtor) {
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

  const sendVerificationCode = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send verification code');
      }

      return true;
    } catch (error) {
      console.error('Error sending verification code:', error);
      throw error;
    }
  };

  const loginWithEmailCode = async (email: string, code: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify code');
      }

      // Set the authenticated user
      setUser(data.user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return true;
    } catch (error) {
      console.error('Error verifying code:', error);
      throw error;
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
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
    signOut({ callbackUrl: '/login' });
  };

  const getRedirectPath = (user: User): string => {
    // KW Singapore and Property Lim Brothers realtors should go to vendors page
    const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
    const isRealtor = allowedDomains.some(domain => user.email.endsWith(domain));
    
    if (isRealtor && user.role === 'realtor') {
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
      <AuthContext.Provider value={{ user: null, login, loginWithEmailCode, sendVerificationCode, loginWithGoogle, signup, logout, loading: true, getRedirectPath }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithEmailCode, sendVerificationCode, loginWithGoogle, signup, logout, loading, getRedirectPath }}>
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