/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "690px",
        md: "928px",
        lg: "1220px",
        xl: "1420px",
        "2xl": "1680px",
      },
    },
    extend: {
      colors: {
        primary: "#0aad0a",
      },
      fontFamily: {
        cairo: '"Cairo", sans-serif;',
      },
    },
  },
  plugins: [],
};
