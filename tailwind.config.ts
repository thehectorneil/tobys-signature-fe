import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#f8cf37",
          dark: "#d4ad2d",
          light: "#ffe27a",
        },
        background: {
          DEFAULT: "#171717",
          soft: "#1f1f1f",
        },
      },
    },
  },
  plugins: [],
};

export default config;