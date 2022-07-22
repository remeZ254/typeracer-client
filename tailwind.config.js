/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        cloud: {
          '0%': { 'margin-left': '-1000px' },
          '100%': { 'margin-left': '100%' }
        },
        shake: {
          '25%': { transform: 'translate(4px)' },
          '50%': { transform: 'translate(-4px)' },
          '75%': { transform: 'translate(4px)' }
        },
        star: {
          '0%': { transform: 'translate(-100vw)' },
          '100%': { transform: 'translate(100vw)' }
        }
      }
    }
  },
  plugins: []
};
