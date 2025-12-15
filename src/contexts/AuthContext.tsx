// apps/web/src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageContext';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  language: string;
  educationLevel: string;
  dnaProfile?: any;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setLanguage } = useLanguage();

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dream2skill-user');
    const savedToken = localStorage.getItem('dream2skill-token');
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        // Set language from user preference
        if (parsedUser.language) {
          setLanguage(parsedUser.language);
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
    
    setIsLoading(false);
  }, [setLanguage]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - In production, this would come from your backend
      const mockUser: User = {
        id: '1',
        name: 'Rajesh Kumar',
        email: email,
        phone: '+919876543210',
        village: 'Sample Village',
        language: 'hi', // Default to Hindi for Indian users
        educationLevel: 'secondary',
      };
      
      setUser(mockUser);
      localStorage.setItem('dream2skill-user', JSON.stringify(mockUser));
      localStorage.setItem('dream2skill-token', 'mock-jwt-token');
      
      // Set user's preferred language
      if (mockUser.language) {
        setLanguage(mockUser.language);
      }
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email || `${userData.phone}@dream2skill.ai`,
        phone: userData.phone,
        village: userData.village,
        language: userData.language || 'en',
        educationLevel: userData.educationLevel || 'secondary',
      };
      
      setUser(newUser);
      localStorage.setItem('dream2skill-user', JSON.stringify(newUser));
      localStorage.setItem('dream2skill-token', 'mock-jwt-token');
      
      // Set user's chosen language
      if (userData.language) {
        setLanguage(userData.language);
      }
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dream2skill-user');
    localStorage.removeItem('dream2skill-token');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}