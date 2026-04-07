/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          black: '#020202',
          deep: '#0a0a0a',
        },
        hud: {
          white: '#FFFFFF',
          dim: '#4F4F4F',
          glow: 'rgba(255, 255, 255, 0.8)',
          faint: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 8s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        glow: {
          '0%': { textShadow: '0 0 4px rgba(255,255,255,0.4)' },
          '100%': { textShadow: '0 0 8px rgba(255,255,255,0.8)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
