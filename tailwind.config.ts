import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        Card: "0px 0px 10px rgba(81, 94, 125, 0.1);",
        Card2: "0px 0px 10px rgba(81, 94, 125, 0.25);",
        Card3: "0px 10px 20px 0px rgba(92, 115, 160, 0.07)",
      },
      colors: {
        primary: "#8a20fa",
        secondary: "#ff0000",
        third: "#ccc"
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
