/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
        secondary: colors.red,
      },
      maxWidth: {
        "8xl": "1520px",
      },
      spacing: {
        section: "3rem",
      },
      fontSize: {
        subHead: "1.6rem",
        cardSm: "7px",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
      boxShadow: {
        primary: "0 8px 8px 0px ",
      },
    },
  },
  plugins: [require("tailwindcss-filters")],
};
