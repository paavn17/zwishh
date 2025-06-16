/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00D4FF",
      },
       fontFamily: {
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif'],
        mono: ['ui-monospace'],
      },
    },
  },
  plugins: [],
}