const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['**/*.{ts,tsx}'],

  theme: {
    screens: {
      'sm': '640px',
      'md': '768px'
    },

    fontFamily: {
      sans: ['kodchasan', 'sans-serif']
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,

      indigo: colors.indigo,
      pink: colors.pink,
      teal: colors.teal,
      cyan: colors.cyan
    }
  }
}
