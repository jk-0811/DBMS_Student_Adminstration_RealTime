/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
        },
        secondary: "#7c3aed",
        accent: "#06b6d4",
        surface: "#ffffff",
        muted: "#94a3b8",
      },

      boxShadow: {
        glass: "0 24px 80px rgba(15,23,42,0.12)",
      },

      fontFamily: {
        sans: ["Inter", "Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },

  plugins: [],
};