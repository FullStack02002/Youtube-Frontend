/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1516px',
      },
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".transition-right": {
          transition: "right 0.3s ease-in-out",
        },
        ".text-no-resize": {
          resize: "none",
        },
        ".no-scroll": {
          overflow: "hidden",
          height: "100vh",
        },
       
        
      });
    },
  ],
};
