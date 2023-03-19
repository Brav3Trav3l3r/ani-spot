/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily:{
        lato:['Lato', 'sans-serif'],
        roboto:['Roboto', 'sans-serif'],
        lexend:['Lexend', 'sans-serif']
      },
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide')
  ]
};