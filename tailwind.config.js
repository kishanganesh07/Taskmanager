/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        accent: {
          DEFAULT: '#14B8A6',
          light: '#2DD4BF',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        surface: {
          light: '#F8FAFC',
          dark: '#09090B',
        },
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.10)',
        softDark: '0 1px 2px rgba(0, 0, 0, 0.3), 0 8px 24px -8px rgba(0, 0, 0, 0.5)',
        ring: '0 0 0 3px rgba(37, 99, 235, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: 0, transform: 'translateY(-6px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        collapseOut: {
          '0%': { opacity: 1, maxHeight: '200px', transform: 'scale(1)' },
          '100%': { opacity: 0, maxHeight: '0px', transform: 'scale(0.96)' },
        },
        popCheck: {
          '0%': { transform: 'scale(0.7)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: 0 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.35)' },
          '100%': { boxShadow: '0 0 0 10px rgba(37, 99, 235, 0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
        collapseOut: 'collapseOut 0.24s ease forwards',
        popCheck: 'popCheck 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)',
        confettiFall: 'confettiFall linear forwards',
        fadeIn: 'fadeIn 0.2s ease',
        pulseRing: 'pulseRing 1.2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
