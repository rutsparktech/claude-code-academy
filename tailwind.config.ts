import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#6B46C1",
          light: "#9F7AEA",
          dark: "#553C9A",
          50: "#F3EEFF",
        },
        teal: {
          DEFAULT: "#14B8A6",
          light: "#2DD4BF",
          dark: "#0D9488",
        },
        bg: {
          dark: "#0A0A0F",
          card: "#12121A",
          hover: "#1A1A26",
        },
      },
      fontFamily: {
        sans: ["Heebo", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-up": "fadeInUp 0.5s ease forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
      },
      borderRadius: { xl: "16px", "2xl": "24px" },
    },
  },
  plugins: [],
};
export default config;
