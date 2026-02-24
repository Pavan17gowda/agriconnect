const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // Green (Primary color for environment theme)
        secondary: "#2196F3", // Blue (Secondary color for environment theme)
        tertiary: "#8D6E63", // Light brown (Tertiary color for environment theme)
        danger: "#f44336", // Red (For cancel/reject buttons)
        "danger-dark": "#d32f2f", // Dark red (For hover state of reject button)
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
