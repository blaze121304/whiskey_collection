import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'hsl(24 10% 6%)',
          light: 'hsl(30 20% 96%)',
        },
        foreground: {
          DEFAULT: 'hsl(30 20% 96%)',
          light: 'hsl(24 10% 6%)',
        },
        card: {
          DEFAULT: 'hsla(24, 20%, 10%, 0.6)',
          light: 'hsla(30, 20%, 96%, 0.6)',
        },
        cardForeground: {
          DEFAULT: 'hsl(30 20% 96%)',
          light: 'hsl(24 10% 6%)',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03'
        }
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      },
      backdropBlur: {
        xs: '2px'
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config



