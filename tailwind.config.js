/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: 'class', // Enable dark mode using class strategy
  theme: {
    fontFamily: {
      serif: 'Inter var, ui-sans-serif, system-ui',
    },
    extend: {},
  },
  plugins: [],
};
