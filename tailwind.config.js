module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orangeAMPA': '#FF7F2A', 
        'greenescola': '#009140',
      },
      fontFamily: {
        'lato': [ 'Lato', 'sans-serif' ],
      }
    },
  },
  plugins: [],
};
