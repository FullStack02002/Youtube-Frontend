/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.transition-right': {
          transition: 'right 0.3s ease-in-out',
        },
        '.text-no-resize':{
          resize: 'none'
        }
        
      });
    },
  ],
}