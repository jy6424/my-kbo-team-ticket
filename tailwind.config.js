/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kbobold: ["KBOFontBold", "sans-serif"],
        kbolight: ["KBOFontMedium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
