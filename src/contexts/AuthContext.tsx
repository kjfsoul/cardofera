import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// src/contexts/AuthContext.tsx
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})


interface GiftPreferences {
  giftTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  interests: string[];
}

interface User {
  id: string;
  email: string;
  name?: string;
  preferences?: GiftPreferences;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - replace with real auth service
      const mockUser = {
        id: "1",
        email,
        name: "Test User",
        preferences: {
          giftTypes: ["Books", "Electronics"],
          priceRange: { min: 20, max: 200 },
          interests: ["Reading", "Technology"],
        },
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign in");
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Mock signup - replace with real auth service
      const mockUser = {
        id: "1",
        email,
        name,
        preferences: {
          giftTypes: [],
          priceRange: { min: 0, max: 100 },
          interests: [],
        },
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast.success("Successfully signed up!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign up");
      throw error;
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Successfully signed out!");
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Profile updated successfully!");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};