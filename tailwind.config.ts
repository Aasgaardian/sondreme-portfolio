import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        linen: '#FFEDDF',
        teal: '#81A094',
        slate: '#294D4A',
        midnight: '#22162B',
        ink: '#00171F',
      },
      keyframes: {
        'pop-blob': {
          '0%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.2)' },
          '66%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'pop-blob': 'pop-blob 5s infinite',
      },
    },
  },
  plugins: [],
}
export default config
