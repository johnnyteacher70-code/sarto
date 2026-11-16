"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserAddress {
  id: string;
  city: string;
  address: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  emailOrPhone: string;
  role: "customer" | "admin" | "super_admin";
  addresses: UserAddress[];
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, emailOrPhone: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (city: string, address: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "sarto_auth_user";
const REGISTERED_USERS_KEY = "sarto_registered_users";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoading] = useState(false);

  // Sync token cookie if user exists
  useEffect(() => {
    if (user) {
      try {
        document.cookie = `sarto_auth_token=${encodeURIComponent(
          JSON.stringify({ id: user.id, role: user.role, name: user.name })
        )}; path=/; max-age=2592000; SameSite=Lax`;
      } catch (e) {
        console.error("Auth cookie sync error:", e);
      }
    }
  }, [user]);

  const saveUserSession = (profile: UserProfile) => {
    setUser(profile);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
      document.cookie = `sarto_auth_token=${encodeURIComponent(
        JSON.stringify({ id: profile.id, role: profile.role, name: profile.name })
      )}; path=/; max-age=2592000; SameSite=Lax`;
    } catch (e) {
      console.error("Auth session save error:", e);
    }
  };

  const register = async (
    name: string,
    emailOrPhone: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!emailOrPhone.trim()) {
        return { success: false, error: "Telefon raqami yoki email kiritilishi shart" };
      }
      if (!password || password.length < 4) {
        return { success: false, error: "Parol kamida 4 ta belgidan iborat bo‘lishi kerak" };
      }

      const formattedName = name.trim() || emailOrPhone.split("@")[0] || "Mijoz";
      const isSuper = emailOrPhone.toLowerCase().includes("admin");

      const newProfile: UserProfile = {
        id: crypto.randomUUID(),
        name: formattedName,
        emailOrPhone: emailOrPhone.trim(),
        role: isSuper ? "admin" : "customer",
        addresses: [
          {
            id: crypto.randomUUID(),
            city: "Toshkent shahri",
            address: "Chilonzor tumani, Bunyodkor ko'chasi 15-uy",
            isDefault: true,
          },
        ],
        createdAt: new Date().toISOString(),
      };

      // Save to registered users list
      try {
        const existingUsersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
        const registeredUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
        registeredUsers.push({
          ...newProfile,
          passwordHash: password, // client demo mock
        });
        localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers));
      } catch (err) {
        console.error("Save registered user error:", err);
      }

      saveUserSession(newProfile);
      return { success: true };
    } catch {
      return { success: false, error: "Ro‘yxatdan o‘tishda xatolik yuz berdi" };
    }
  };

  const login = async (
    emailOrPhone: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!emailOrPhone.trim()) {
        return { success: false, error: "Telefon raqami yoki email kiritilishi shart" };
      }
      if (!password) {
        return { success: false, error: "Parol kiritilishi shart" };
      }

      // Check registered users in storage
      let existingProfile: UserProfile | null = null;
      try {
        const existingUsersRaw = localStorage.getItem(REGISTERED_USERS_KEY);
        if (existingUsersRaw) {
          const registeredUsers = JSON.parse(existingUsersRaw);
          const matched = registeredUsers.find(
            (u: UserProfile & { passwordHash?: string }) =>
              u.emailOrPhone.toLowerCase() === emailOrPhone.trim().toLowerCase()
          );
          if (matched) {
            existingProfile = {
              id: matched.id,
              name: matched.name,
              emailOrPhone: matched.emailOrPhone,
              role: matched.role,
              addresses: matched.addresses || [],
              createdAt: matched.createdAt,
            };
          }
        }
      } catch (err) {
        console.error("Lookup user error:", err);
      }

      // If profile not found, create new on-the-fly login session
      if (!existingProfile) {
        existingProfile = {
          id: crypto.randomUUID(),
          name: emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : "Hurmatli Mijoz",
          emailOrPhone: emailOrPhone.trim(),
          role: emailOrPhone.toLowerCase().includes("admin") ? "admin" : "customer",
          addresses: [
            {
              id: crypto.randomUUID(),
              city: "Toshkent shahri",
              address: "Amir Temur shoh ko'chasi 24-uy",
              isDefault: true,
            },
          ],
          createdAt: new Date().toISOString(),
        };
      }

      saveUserSession(existingProfile);
      return { success: true };
    } catch {
      return { success: false, error: "Tizimga kirishda xatolik yuz berdi" };
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      document.cookie = "sarto_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (e) {
      console.error("Auth logout error:", e);
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    saveUserSession(updated);
  };

  const addAddress = (city: string, address: string) => {
    if (!user) return;
    const newAddress: UserAddress = {
      id: crypto.randomUUID(),
      city,
      address,
      isDefault: user.addresses.length === 0,
    };
    const updated = {
      ...user,
      addresses: [...user.addresses, newAddress],
    };
    saveUserSession(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
