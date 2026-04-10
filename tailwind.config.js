/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#23282d',
        text: '#ffffff',
        surface: '#2c3338',
        surfaceHighlight: '#3a3f44',
        accent: '#A5625B',
        heading: '#ffffff',
        vastintPrimary: '#A5625B',
        vastintSecondary: '#874641',
        vastintDark: '#23282d',
        vastintSurface: '#2c3338',
        vastintBeige: '#C1C3BD',
        vastintCream: '#f5f0eb',
        dpo: {
          red: "#c4625a",
          orange: "#d4876e",
          black: "#23282d",
          gray: "#9ca3af",
          blue: "#7a9bb5",
          aqua: "#6dab8a",
          green: "#6dab8a",
          yellow: "#d4a94e",
          rose: "#c87a72",
          cream: "#f5f0eb"
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        drama: ['"DM Serif Display"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
