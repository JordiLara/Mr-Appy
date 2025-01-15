/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          500: "#10B981",
        },
        green: {
          500: "#22C55E",
        },
        yellow: {
          500: "#EAB308",
        },
        orange: {
          500: "#F97316",
        },
        red: {
          500: "#EF4444",
        },
      },
    },
  },
  safelist: [
    "bg-emerald-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-gray-500",
  ],
};