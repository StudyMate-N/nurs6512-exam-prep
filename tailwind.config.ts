import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0F172A',
        'navy-light': '#1E293B',
        accent: '#0F9E75',
        'accent-light': '#E6F7F2',
        'accent-dark': '#0D7A5D',
        'bg-app': '#F8FAFC',
        'card-border': '#E2E8F0',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
