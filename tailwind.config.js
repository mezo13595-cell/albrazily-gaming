/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#0a0a0a',
          charcoal: '#141414',
          dark: '#1a1a1a',
          yellow: '#f0e100',
          green: '#00ff41',
          gold: '#ffd700',
        }
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px #f0e100, 0 0 10px #f0e100' },
          '100%': { boxShadow: '0 0 20px #f0e100, 0 0 30px #f0e100' },
        }
      }
    },
  },
  plugins: [],
};
