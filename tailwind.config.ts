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
        primary: {
          DEFAULT: "#6b3bd6",
          strong: "#5a2fc0",
          soft: "#a07cff",
          tint: "#ede7fb",
        },
        bg: "#f7f5fb",
        surface: "#ffffff",
        "surface-alt": "#f2eefb",
        ink: "#1a1320",
        muted: "#6b6478",
        "border-soft": "#e3ddec",
        success: "#2a8f64",
        danger: "#d23b3b",
        warning: "#e08a2b",
        "accent-pink": "#c94b9b",
        secondary: "#3f6df0",
        "cat-pokemon": "#6b3bd6",
        "cat-magic": "#3f6df0",
        "cat-yugioh": "#a07cff",
        "cat-lorcana": "#2a8f64",
        "cat-onepiece": "#c94b9b",
      },
      fontFamily: {
        display: ['"Bagel Fat One"', "Georgia", "serif"],
        body: ['"Space Grotesk"', "-apple-system", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SF Mono", "monospace"],
      },
      boxShadow: {
        "offset-sm": "3px 3px 0 #1a1320",
        "offset-md": "4px 4px 0 #1a1320",
        "offset-lg": "8px 8px 0 #1a1320",
        "offset-accent": "3px 3px 0 #6b3bd6",
        "offset-accent-md": "4px 4px 0 #6b3bd6",
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
        pill: "999px",
      },
      fontSize: {
        "display-xl": "56px",
        "display-lg": "36px",
        "display-md": "30px",
        "display-sm": "22px",
        "body-lg": "16px",
        body: "15px",
        "body-sm": "13px",
        label: "12px",
        "label-sm": "10px",
        micro: "9px",
      },
      letterSpacing: {
        wider: "2px",
        wide: "1.5px",
      },
    },
  },
  plugins: [],
};
export default config;
