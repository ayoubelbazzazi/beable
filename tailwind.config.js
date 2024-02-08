/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "enhance":"url('./images/bg-insights-enhances.webp')",
        "improve":"url('./images/bg-insights-improves.webp')",
        "increase":"url('./images/bg-insights-increases.webp')"
      },
      screens:{
        "2lg":"1200px"
      }
    },
  },
  plugins: [require("tailwindcss-scrollbar")],
};
