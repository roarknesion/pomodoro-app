module.exports = {
  mode: 'jit',
  purge: ['**/*.{ts,tsx}'],

  theme: {
    screens: {
      'sm': '640px',
      'md': '768px'
    },

    extend: {
      fontFamily: {
        sans: ['kodchasan', 'sans-serif']
      }
    }
  }
}
