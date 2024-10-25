/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'caution-tape': 'repeating-linear-gradient(45deg, #fdc710 0, #fdc710 20px, black 20px, black 40px)',
      },
    },
  },
  plugins: [],
}