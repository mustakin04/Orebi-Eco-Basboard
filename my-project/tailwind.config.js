/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // ⬅️ Flowbite content যোগ করা হলো
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),   // DaisyUI plugin
    require("flowbite/plugin"), // ⬅️ Flowbite plugin যোগ করা হলো
  ],
}
