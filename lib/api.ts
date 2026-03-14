const ENV = process.env.VERCEL_ENV || "development";

const API_MAP: Record<string, string> = {
  production: "https://tobys-signature-api-prod.onrender.com",
  preview: "https://tobys-signature-api-uat.onrender.com",
  development: "http://localhost:8080",
};

export const API_BASE_URL = API_MAP[ENV];