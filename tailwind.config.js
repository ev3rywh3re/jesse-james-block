/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./style.css", "./**/*.php"],
  theme: {
    extend: {},
    goldenRatio: {
      // Custom configuration @see: https://github.com/truefrontier/tailwindcss-golden-ratio/tree/master#how-to-customize
    },
  },
  plugins: [
    require('tailwindcss-golden-ratio'), 
  ],
}

