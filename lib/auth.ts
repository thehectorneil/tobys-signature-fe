import { jwtDecode } from "jwt-decode";
import api from "./axios";

/* =========================
   TYPES
========================= */

export type Role = "CUSTOMER" | "ADMIN" | "STAFF";

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    role: "CUSTOMER" | "ADMIN" | "STAFF";
  };
}

/* =========================
   TOKEN STORAGE
========================= */

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}

/* =========================
   JWT UTILITIES
========================= */

export function decodeToken(token: string): any | null {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded: any = decodeToken(token);

  if (!decoded?.exp) return true;

  return decoded.exp * 1000 < Date.now();
}

export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;
  return !isTokenExpired(token);
}

/* =========================
   LOGIN APIs (MULTI ROLE)
========================= */

// CUSTOMER
export async function loginCustomer(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/customer/login", {
    email,
    password,
  });

  return res.data;
}

// ADMIN
export async function loginAdmin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/admin/login", {
    email,
    password,
  });

  return res.data;
}

// STAFF
export async function loginStaff(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/staff/login", {
    email,
    password,
  });

  return res.data;
}

/* =========================
   OPTIONAL HELPERS
========================= */

export function getUserFromToken(): User | null {
  const token = getToken();
  if (!token) return null;

  const decoded: any = decodeToken(token);

  if (!decoded) return null;

  return {
    id: decoded.sub,
    email: decoded.email,
    role: decoded.role,
  };
}