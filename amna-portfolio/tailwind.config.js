/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        red: "rgb(var(--color-red) / <alpha-value>)",
        tape: "rgb(var(--color-tape) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        green: "rgb(var(--color-green) / <alpha-value>)",
        plum: "rgb(var(--color-plum) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        hand: ["var(--font-hand)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        content: "72rem",
      },
      rotate: {
        1: "1deg",
        2: "2deg",
        3: "3deg",
      },
    },
  },
  plugins: [],
};