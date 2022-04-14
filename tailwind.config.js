module.exports = {
  content: [
    "./src/**/*.{html,js,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'hero': "url('img/bg.jpg')",
       })
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
