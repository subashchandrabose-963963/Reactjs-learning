/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1DA1F2',
        'custom-gray': '#657786',
      },
    },
  },
  plugins: [],
}
