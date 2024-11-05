/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "index.html",
    "src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#19224D',
        'base-hover': '#27357b',
      },
    },
  },
  plugins: [],
  extend: {
    screens: {
      'sm': '640px', // Small devices (landscape phones)
      'md': '768px', // Medium devices (tablets)
      'lg': '1024px', // Large devices (desktops)
      'xl': '1280px', // Extra large devices (large desktops)
      '2xl': '1536px' // Extra extra large devices (larger desktops)

    }
  }
}

