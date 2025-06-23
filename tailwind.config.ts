import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        famicomjp: ['"PixelMplus10-Regular"', "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
