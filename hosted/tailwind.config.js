/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        ps2: ["Press Start 2P", "cursive"],
      },
      colors:{
        brightGreen : "#00ff00"
      }
    },
  },
  plugins: [],
};
