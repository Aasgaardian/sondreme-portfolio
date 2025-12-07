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
    },
  },
  plugins: [],
}
export default config
