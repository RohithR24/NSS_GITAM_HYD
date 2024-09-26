import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          light: '#a7b9ff',   // Lighter shade
          DEFAULT: '#2849db', // Base color
          dark: '#1c34a6',    // Darker shade
        }
      },
    },
  },
  plugins: []
};

  
export default config;
