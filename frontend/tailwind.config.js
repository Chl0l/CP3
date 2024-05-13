/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    colors: {
      primary: "#F7146B",
      secondary: "#E0E0E0",
      tertiary: "#E9C46A",
    },
  },
  plugins: [],
};
