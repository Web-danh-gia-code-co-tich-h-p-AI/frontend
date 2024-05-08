/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-green': '#18A5A7',
        'second-green': '#BFFFC7',
        'third-green': '#CCFFAA',
        'first-green': '#46ADD5',
        'main-black': '#231f20',
      },
      screens: {
        'smmobile': '421px',
        'mobile' : '431px',
        // => @media (min-width: 430px) { ... }
        'tablet': '641px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1025px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1281px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
};
