import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stage: "#ABABB1",   // hero backdrop
        ink: "#1B1B1F",     // primary text / dark surfaces
        steel: "#B4B4BC",   // muted headline text
        bone: "#FFFFFF",
        fleet: "#222222",   // fleet section
      },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      transitionTimingFunction: { nuro: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
export default config;
