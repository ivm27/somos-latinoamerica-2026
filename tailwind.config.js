/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.tsx", // Added this to cover your specific setup
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#FF4433',
          orange: '#FF6600',
          dark: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
}