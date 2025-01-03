import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js"; // Import User type from Supabase
import { supabase } from "@/integrations/supabase/client"; // Import your Supabase client

interface GiftPreferences {
  giftTypes: string[];
  priceRange: {
    min: number;
    max: number;
  };
  interests: string[];
}

interface AppUser {
  id: string;
  email: string;
  name?: string;
  preferences?: GiftPreferences;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      if (supabaseUser) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: (supabaseUser as any).user_metadata?.name || "", // Safely access user_metadata
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    if (!email || !password) {
      toast.error("Please provide email and password.");
      return false;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(`Failed to sign in: ${error.message}`);
        return false;
      }
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: (data.user as any).user_metadata?.name || "", // Safely access user_metadata
        });
        toast.success("Successfully signed in!");
        navigate("/");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(`Failed to sign in: ${error.message}`);
      return false;
    }
  };

  const signUp = async (email: string, password: string, name: string): Promise<boolean> => {
    if (!email || !password || !name) {
      toast.error("Please provide email, password, and name.");
      return false;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) {
        toast.error(`Failed to sign up: ${error.message}`);
        return false;
      }
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: (data.user as any).user_metadata?.name || "", // Safely access user_metadata
        });
        toast.success("Successfully signed up!");
        navigate("/");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(`Failed to sign up: ${error.message}`);
      return false;
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
    toast.success("Successfully signed out!");
  };

  const updateProfile = async (data: Partial<AppUser>): Promise<boolean> => {
    if (!user) return false;
    try {
      const { data: updatedUser, error } = await supabase.auth.updateUser({
        data: {
          ...data,
        },
      });
      if (error) {
        toast.error(`Failed to update profile: ${error.message}`);
        return false;
      }
      if (updatedUser) {
        setUser({
          ...user,
          ...data,
          name: (updatedUser as any).user_metadata?.name || "", // Safely access user_metadata
        });
        toast.success("Profile updated successfully!");
        return true;
      }
      return false;
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
      return false;
    }
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