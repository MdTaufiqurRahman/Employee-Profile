/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: "#1677FF",
        customColorHover: "#123456",
        customDeleteColor: "#EB5757",
        customSaveColor: "#1890FF",
      },
    },
    fontFamily: {
      Opensans: "'Open Sans', sans-serif",
    },
  },
  plugins: [],
};
