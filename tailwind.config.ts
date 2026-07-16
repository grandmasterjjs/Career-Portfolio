import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0C10",
          50: "#F7F7F8",
          100: "#EDEEF0",
          200: "#C9CCD3",
          300: "#9BA0AC",
          400: "#6B7280",
          500: "#454B57",
          600: "#2C313C",
          700: "#1D212A",
          800: "#14171E",
          900: "#0F1116",
          950: "#0A0C10",
        },
        paper: {
          DEFAULT: "#FAF9F6",
          100: "#FFFFFF",
          200: "#F3F2EE",
          300: "#E8E6DF",
        },
        ember: {
          DEFAULT: "#FF7A33",
          50: "#FFF3EC",
          100: "#FFE4D2",
          200: "#FFC49E",
          300: "#FFA268",
          400: "#FF8A48",
          500: "#FF7A33",
          600: "#E85F1A",
          700: "#C24A12",
          800: "#963A0F",
          900: "#6E2B0C",
        },
        signal: {
          DEFAULT: "#2DD4BF",
          50: "#EFFDFB",
          100: "#CCFBF3",
          200: "#99F6E6",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgb(255 255 255 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.04) 1px, transparent 1px)",
        "grid-light": "linear-gradient(to right, rgb(10 12 16 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(10 12 16 / 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
