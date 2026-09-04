/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: '#1a365d',
        saffron: '#ff9933',
        offWhite: '#faf8f5',
        lightGray: '#e8e6e3',
      }
    },
  },
  plugins: [],
}
