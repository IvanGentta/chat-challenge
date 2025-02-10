import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        chatColor1: "#014C8D",
        chatColor2: "#0A9DFF",
        chatBorder: "#0E1428",
        chatBackground: "#FDF0D8",
        chatExtra1: "#FCCBB0",
        chatExtra2: "#AED9FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
