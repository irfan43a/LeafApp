/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          200: '#c5e5cf',
          300: '#99d2ac',
          400: '#67b682',
          500: '#419961',
          600: '#317c4d',
          700: '#28633f',
          800: '#234f34',
          900: '#1e422c',
          950: '#0d2417',
        },
        herbal: {
          amber: '#d97706',
          earth: '#78350f',
          leaf: '#15803d',
          sage: '#475569',
          cream: '#fafaf9',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
      }
    },
  },
  plugins: [],
}
