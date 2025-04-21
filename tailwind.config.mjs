/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        serif: ['var(--font-merriweather)'],
      },
      colors: {
        primary: '#172E7C',
        secondary: '#CCE3FF',
      },
      borderWidth: {
        '6': '6px',
      },
      transitionProperty: {
        'height': 'height',
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}