/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a0a0f',
          50: '#1a1a2e',
          100: '#16162b',
          200: '#12121a',
          300: '#0e0e15',
          400: '#0a0a0f',
        },
        accent: {
          DEFAULT: '#6c63ff',
          light: '#8b83ff',
          dark: '#5a52e0',
          secondary: '#00d4aa',
          'secondary-light': '#33e0be',
        },
        text: {
          primary: '#f0f0f5',
          secondary: '#8888a0',
          muted: '#555570',
        },
        glass: {
          DEFAULT: 'rgba(18, 18, 26, 0.7)',
          light: 'rgba(18, 18, 26, 0.4)',
          border: 'rgba(255, 255, 255, 0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(30, end), blink-caret 0.75s step-end infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(108, 99, 255, 0.3), 0 0 20px rgba(108, 99, 255, 0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(108, 99, 255, 0.5), 0 0 60px rgba(108, 99, 255, 0.2)' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink-caret': {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#6c63ff' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #6c63ff, #00d4aa)',
        'gradient-accent-hover': 'linear-gradient(135deg, #8b83ff, #33e0be)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(108, 99, 255, 0.3)',
        'glow-lg': '0 0 40px rgba(108, 99, 255, 0.4)',
        'glow-green': '0 0 20px rgba(0, 212, 170, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
