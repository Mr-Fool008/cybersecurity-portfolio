/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0F14",
        panel: "#121821",
        "panel-raised": "#182029",
        hairline: "#24313D",
        signal: "#00D9B5",
        ink: "#E4EAEF",
        muted: "#7C8B99",
        subtle: "#9FB0BD",
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ['"IBM Plex Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
