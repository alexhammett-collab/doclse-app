"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "guest" | "subscriber" | "paid";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  joinedDate: string;
  avatar?: string;
}

interface AuthContextType {
  user: MockUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const MOCK_USERS: MockUser[] = [
  { id: "1", name: "Alex Ducatista", email: "free@doclse.club", role: "subscriber", joinedDate: "2024-06-01" },
  { id: "2", name: "Jonathan Tait", email: "member@doclse.club", role: "paid", joinedDate: "2024-04-01" },
  { id: "3", name: "Admin User", email: "admin@doclse.club", role: "paid", joinedDate: "2024-04-01" },
];

const MOCK_PASSWORD = "password";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("doclse_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    await new Promise((r) => setTimeout(r, 800));
    const found = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) return { success: false, error: "No account found with that email." };
    if (password !== MOCK_PASSWORD) return { success: false, error: "Incorrect password." };
    setUser(found);
    localStorage.setItem("doclse_user", JSON.stringify(found));
    return { success: true };
  }

  async function register(name: string, email: string, _password: string) {
    await new Promise((r) => setTimeout(r, 800));
    const exists = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, error: "An account with this email already exists." };
    const newUser: MockUser = {
      id: Date.now().toString(),
      name,
      email,
      role: "subscriber",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    localStorage.setItem("doclse_user", JSON.stringify(newUser));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("doclse_user");
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
