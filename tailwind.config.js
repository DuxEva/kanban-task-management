/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      darkMode: "class",
      colors: {
        purple: {
          1: "#635FC7",
          2: "#A8A4FF",
        },
        black: {
          1: "#000112",
          2: "#20212C",
          3: "#2B2C37",
        },
        grey: {
          1: "#828FA3",
          2: "#E4EBFA",
          3: "#F4F7FD",
        },
        red: {
          1: "#EA5555",
          2: "#FF9898",
        },
      },
    },
  },
  plugins: [],
};
