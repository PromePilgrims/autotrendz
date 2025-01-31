import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' }
    },
    extend: {
      colors: {
        primary: {
          50: '#fef5ee',
          100: '#fde9d7',
          200: '#fbcead',
          300: '#f8ab79',
          400: '#f47e43',
          500: '#f05718',
          600: '#e24314',
          700: '#bb3013',
          800: '#952817',
          900: '#782316',
          950: '#410e09'
        }
      }
    }
  },
  plugins: []
}
export default config
