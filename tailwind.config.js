/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#e8f0fe',
          100: '#d2e3fc',
          200: '#a6c8fa',
          300: '#7cacf8',
          400: '#5290f5',
          500: '#4285f4',
          600: '#3b78e7',
          700: '#3367d6',
          800: '#2a56c6',
          900: '#1c3aa9',
        },
      },
      fontFamily: {
        sans: [
          'Google Sans',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(60, 64, 67, 0.3), 0 4px 8px 3px rgba(60, 64, 67, 0.15)',
      },
    },
  },
  plugins: [],
};