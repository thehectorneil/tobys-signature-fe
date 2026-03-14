import { jwtDecode } from "jwt-decode";
import api from "./axios";

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

/**
 * Save token
 */
export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("token", token);
}

/**
 * Remove token
 */
export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
}

/**
 * Decode JWT
 */
export function decodeToken(token: string): any | null {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded: any = decodeToken(token);

  if (!decoded?.exp) return true;

  return decoded.exp * 1000 < Date.now();
}

/**
 * Check if token is valid
 */
export function isTokenValid(): boolean {
  const token = getToken();

  if (!token) return false;

  return !isTokenExpired(token);
}

/**
 * Login API request
 */
export async function loginRequest(email: string, password: string) {
  const res = await api.post("/auth/login", {
    email,
    password,
  });

  return res.data;
}