import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "../types";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Portal da Filosofia",
    email: "admin@institutoagora.com",
    role: "admin",
    canAccessClasses: true,
    courseAccess: [],
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@email.com",
    role: "student",
    canAccessClasses: true,
    courseAccess: ["1", "2"],
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria@email.com",
    role: "student",
    canAccessClasses: true,
    courseAccess: ["3"],
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro@email.com",
    role: "student",
    canAccessClasses: false,
    courseAccess: [],
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    try {
      const response = await axios.post(
        "http://localhost:9001/api/auth/login",
        { email, password }
      );
      // const foundUser = mockUsers.find((u) => u.email === email);
      // if (foundUser && password === '123456') {
      if (response?.data?.user) {
        setUser(response?.data?.user);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem("token", (response?.data?.token));

        setIsLoading(false);
        return true;
      }

      // }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (
    email: string,
    name: string,
    password: string,
    course: string
  ): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    try {
      const response = await axios.post(
        "http://localhost:9001/api/auth/register",
        { name, email, password, course }
      );
      // const foundUser = mockUsers.find((u) => u.email === email);
      // if (foundUser && password === '123456') {
      if (response?.data?.user) {
        setUser(response?.data?.user);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem("token", (response?.data?.token));
        setIsLoading(false);
        return true;
      }

      // }

      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
