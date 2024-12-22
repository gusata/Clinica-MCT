import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        lg: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        xl: '4px 4px 6px rgba(0, 0, 0, 0.5)',
        xxl: '3px 3px 9px rgba(0, 0, 0, 0.5)',
      },

      fontFamily: {
        yanone: ["Yanone", "sans-serif"],
      },
      colors: {
        main: "#0a0908",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
} satisfies Config;
