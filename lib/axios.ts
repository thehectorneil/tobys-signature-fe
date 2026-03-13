import axios from "axios";
import { jwtDecode } from "jwt-decode";

/**
 * Axios instance using environment variable
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

/**
 * Inactivity timeout (10 minutes)
 */
const INACTIVITY_LIMIT = 10 * 60 * 1000;

let lastActivity = Date.now();

/**
 * Reset activity timer
 */
function resetActivityTimer() {
  lastActivity = Date.now();
}

/**
 * Logout helper
 */
function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
}

/**
 * Check token expiration
 */
function isTokenExpired(token: string) {
  try {
    const decoded: any = jwtDecode(token);

    if (!decoded.exp) return true;

    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

/**
 * Track user activity (browser only)
 */
if (typeof window !== "undefined") {
  ["click", "mousemove", "keydown", "scroll"].forEach((event) =>
    window.addEventListener(event, resetActivityTimer)
  );
}

/**
 * Request interceptor
 */
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  /**
   * Logout if inactive for 10 minutes
   */
  if (Date.now() - lastActivity > INACTIVITY_LIMIT) {
    logout();
    return Promise.reject("Session expired due to inactivity");
  }

  if (token) {
    /**
     * Logout if token expired
     */
    if (isTokenExpired(token)) {
      logout();
      return Promise.reject("Token expired");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Response interceptor
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;