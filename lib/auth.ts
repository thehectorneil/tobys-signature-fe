import { jwtDecode } from "jwt-decode";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isTokenValid() {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: any = jwtDecode(token);

    if (!decoded.exp) return false;

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
}