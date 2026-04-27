"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  setToken,
  removeToken,
  isTokenValid,
  getUserFromToken,
  AuthResponse,
  User,
} from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     AUTO LOGIN ON REFRESH
  ========================= */
  useEffect(() => {
    const token = getToken();
  
    if (!token || !isTokenValid()) {
      removeToken();
      setIsLoading(false);
      return;
    }
  
    const decodedUser = getUserFromToken();
  
    if (decodedUser) {
      setUser(decodedUser);
      setTokenState(token);
    }
  
    setIsLoading(false); // ✅ VERY IMPORTANT
  }, []);

  /* =========================
     LOGIN
  ========================= */
  function login(data: AuthResponse) {
    setToken(data.token);
  
    const decodedUser = getUserFromToken(); // ✅ decode from JWT
  
    setTokenState(data.token);
    setUser(decodedUser);
  
    document.cookie = `token=${data.token}; path=/`;
  }

  /* =========================
     LOGOUT
  ========================= */
  function logout() {
    removeToken();

    setUser(null);
    setTokenState(null);

    document.cookie = "token=; Max-Age=0; path=/";
  }

  return (
    <AuthContext.Provider value={{ user, token: tokenState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

/* =========================
   HOOK
========================= */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}