import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0b0c10",
        card: "#101218",
        accent: "#7cffc4",
        accentMuted: "#40c9a2",
        outline: "#1c1f2a"
      },
      borderRadius: {
        xl: "1rem"
      },
      boxShadow: {
        glow: "0 12px 80px rgba(124, 255, 196, 0.12)",
        soft: "0 20px 60px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        body: ["var(--font-dm)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
