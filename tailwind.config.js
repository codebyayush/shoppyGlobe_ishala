/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Rubik', 'sans-serif'],
        customBold: ['Rubik-bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

