/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Work Sans Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
        serif: ['var(--font-merriweather)'],
      },
      colors: {
        primary: '#172E7C',
        secondary: '#CCE3FF',
        background: '#0e1421',
        accent: '#57e1ff',
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}