import axios from "axios";
import { API_BASE_URL } from "./api";
import { getToken, isTokenExpired, removeToken } from "./auth";

/**
 * Axios instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
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
 * Logout helper (centralized)
 */
function forceLogout() {
  if (typeof window !== "undefined") {
    removeToken();

    // optional: redirect to home instead of /login if you want
    window.location.href = "/";
  }
}

/**
 * Track user activity (client only)
 */
if (typeof window !== "undefined") {
  ["click", "mousemove", "keydown", "scroll"].forEach((event) =>
    window.addEventListener(event, resetActivityTimer)
  );
}

/**
 * =========================
 * REQUEST INTERCEPTOR
 * =========================
 */
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    /**
     * Logout if inactive
     */
    if (Date.now() - lastActivity > INACTIVITY_LIMIT) {
      forceLogout();
      return Promise.reject("Session expired due to inactivity");
    }

    if (token) {
      /**
       * Check JWT expiration
       */
      if (isTokenExpired(token)) {
        forceLogout();
        return Promise.reject("Token expired");
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * =========================
 * RESPONSE INTERCEPTOR
 * =========================
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("token"); // or your getToken()

    console.log("INTERCEPTOR HIT:", error.response?.status);
    if (error.response?.status === 401 && token) {
      // 🔥 only logout if user already had a session
      forceLogout();
    }

    return Promise.reject(error);
  }
);

export default api;