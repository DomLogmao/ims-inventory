module.exports = {
  purge: {
    enabled: true,
    content: [
      './src/**/*.{html,ts}',
      "./node_modules/tw-elements/dist/js/**/*.js"
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '100': '27rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
}
