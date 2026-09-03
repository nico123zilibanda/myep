/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mjs}",
    "./components/**/*.{js,ts,jsx,tsx,mjs}",
  ],
  theme: {
    extend: {
      colors: {
        /* =========================
         * BRAND COLORS (BUTTONS)
         * ========================= */
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-foreground": "var(--primary-foreground)",

        /* Government palette (Tanzania flag-inspired) */
        gov: {
          green: {
            50: "var(--gov-green-50)",
            100: "var(--gov-green-100)",
            200: "var(--gov-green-200)",
            300: "var(--gov-green-300)",
            400: "var(--gov-green-400)",
            500: "var(--gov-green-500)",
            600: "var(--gov-green-600)",
            700: "var(--gov-green-700)",
            800: "var(--gov-green-800)",
            900: "var(--gov-green-900)",
          },
          blue: {
            50: "var(--gov-blue-50)",
            100: "var(--gov-blue-100)",
            200: "var(--gov-blue-200)",
            300: "var(--gov-blue-300)",
            400: "var(--gov-blue-400)",
            500: "var(--gov-blue-500)",
            600: "var(--gov-blue-600)",
            700: "var(--gov-blue-700)",
            800: "var(--gov-blue-800)",
            900: "var(--gov-blue-900)",
          },
          gold: {
            50: "var(--gov-gold-50)",
            100: "var(--gov-gold-100)",
            200: "var(--gov-gold-200)",
            300: "var(--gov-gold-300)",
            400: "var(--gov-gold-400)",
            500: "var(--gov-gold-500)",
            600: "var(--gov-gold-600)",
            700: "var(--gov-gold-700)",
            800: "var(--gov-gold-800)",
            900: "var(--gov-gold-900)",
          },
          red: "var(--gov-red)",
          "red-hover": "var(--gov-red-hover)",
          ink: "var(--gov-ink)",
          "ink-soft": "var(--gov-ink-soft)",
          paper: "var(--gov-paper)",
          canvas: "var(--gov-canvas)",
          mist: "var(--gov-mist)",
        },

        /* optional states */
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        border: "var(--border)",
      },

      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },

      keyframes: {
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },

      animation: {
        slideIn: "slideIn 0.3s ease-out",
        slideOut: "slideOut 0.3s ease-in",
        fadeIn: "fadeIn 0.2s ease-in",
      },
    },
  },
  plugins: [],
};