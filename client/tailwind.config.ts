import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    // for calendar color scheme
    "bg-green-50",
    "bg-[#ECFEFF]",
    "bg-pink-50",
    "bg-blue-50",
    "bg-gray-50",
    "bg-green-700",
    "bg-[#0E7490]",
    "bg-pink-600",
    "bg-blue-700",
    "bg-gray-700",
    "text-gray-700",
    "text-[#0E7490]",
    "text-pink-600",
    "text-blue-700",
    "text-gray-700",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
