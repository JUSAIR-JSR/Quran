/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This is the crucial line for dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
          dark: '#1E40AF' // Added dark variant
        },
        secondary: {
          DEFAULT: '#065F46',
          light: '#10B981',
          dark: '#047857' // Added dark variant
        },
        // Adding dark mode base colors
        dark: {
          bg: '#1a202c',
          text: '#f7fafc',
          primary: '#2d3748',
          secondary: '#4a5568'
        }
      },
      fontFamily: {
        arabic: ['"Amiri Quran"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}