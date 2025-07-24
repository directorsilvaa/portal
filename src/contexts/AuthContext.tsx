import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Portal da Filosofia',
    email: 'admin@institutoagora.com',
    role: 'admin',
    canAccessClasses: true,
    courseAccess: [],
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'student',
    canAccessClasses: true,
    courseAccess: ['1', '2'],
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'student',
    canAccessClasses: true,
    courseAccess: ['3'],
  },
  {
    id: '4',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    role: 'student',
    canAccessClasses: false,
    courseAccess: [],
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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