/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5EE",
        card: "#FFFFFF",
        line: "#C7D0DC",
        ink: "#1C2541",
        muted: "#5B6472",
        red: "#B14444",
        tape: "#E3B23C",
        gold: "#8A6416",
        green: "#3F7554",
        plum: "#6B3F5E",
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
