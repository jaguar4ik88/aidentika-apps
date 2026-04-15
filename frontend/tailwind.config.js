/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e3ff',
          200: '#b4c7ff',
          300: '#8aa6ff',
          400: '#4f74ff',
          500: '#2745ff',
          600: '#1e35db',
          700: '#1627a8',
          800: '#101b7a',
          900: '#0b1252',
        },
      },
    },
  },
  plugins: [],
}
