/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fade-up": "fade-up 700ms ease-out forwards",
        glow: "glow 2.8s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 0 0 rgba(255,255,255,0.25)", backgroundColor: "rgba(255,255,255,0.08)" },
          "60%": { boxShadow: "0 0 0 10px rgba(255,255,255,0)", backgroundColor: "rgba(255,255,255,0.18)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
        },
      },
      colors: {
        primary: {
          light: "#6366f1", // indigo-500
          dark: "#7e22ce",  // purple-700
        },
        secondary: {
          light: "#4b5563", // gray-600
          dark: "#111827",  // gray-900
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
