/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          950: '#030712',
          900: '#050a18',
          800: '#0a1024',
          700: '#0f172a',
        },
        electric: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.6), 0 0 25px -5px rgba(59, 130, 246, 0.25)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-rose': '0 0 25px -5px rgba(244, 63, 94, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'cert': '0 20px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px -5px rgba(59, 130, 246, 0.25)',
      },
      animation: {
        'ambient-slow': 'ambientFloat 20s ease-in-out infinite alternate',
        'ambient-slow-rev': 'ambientFloatRev 25s ease-in-out infinite alternate',
        'ambient-pulse': 'ambientPulse 15s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        ambientFloat: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(60px, -40px) scale(1.1)' },
          '100%': { transform: 'translate(-40px, 30px) scale(0.95)' },
        },
        ambientFloatRev: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-50px, 50px) scale(1.08)' },
          '100%': { transform: 'translate(40px, -30px) scale(0.92)' },
        },
        ambientPulse: {
          '0%, 100%': { opacity: '0.22' },
          '50%': { opacity: '0.38' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
};
