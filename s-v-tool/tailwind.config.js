/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryTeal: "#00A2AD",
        darkerTeal: "#014656",
        orangeTeal: "#FDD65D",
        darkerOrange: "#F6A801",
        svBg: "#F9F7F6",
        svText: "#1C1D26",
        iconGray: "#B6B6B6",
      },
      fontFamily: {
        GeistMono: ["GeistMono", "sans-serif"],
        GeistVF: ["GeistVF", "sans-serif"],
      },
    },
  },
  plugins: [],
};
