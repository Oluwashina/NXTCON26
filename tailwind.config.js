/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#050505',
          900: '#0a0a0b',
          800: '#101113',
          700: '#16181b',
          600: '#1e2024',
          500: '#282b30',
        },
        ivory: {
          DEFAULT: '#f2efe7',
          200: '#e9e4d8',
          300: '#d8d2c4',
          400: '#b4ae9f',
          500: '#8a857a',
        },
        gold: {
          DEFAULT: '#c6a15b',
          light: '#e4c78c',
          deep: '#94733a',
          brand: '#ffc533',
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', '"Didot"', '"Times New Roman"', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        mega: '0.42em',
      },
      screens: {
        xs: '400px',
        tall: { raw: '(min-height: 780px)' },
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.16, 1, 0.3, 1)',
        move: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)', filter: 'blur(6px)' },
          to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.08)' },
        },
        'light-sweep': {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)', opacity: '0' },
          '40%': { opacity: '0.5' },
          '100%': { transform: 'translateX(220%) skewX(-18deg)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.34' },
          '50%': { opacity: '0.72' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.82)', opacity: '0.55' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1.1s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1.4s ease-out both',
        'slow-zoom': 'slow-zoom 28s ease-out infinite alternate',
        'light-sweep': 'light-sweep 4.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        breathe: 'breathe 5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
};
