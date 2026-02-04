/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Merriweather"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#00162f',
          900: '#00205b',
          800: '#12306b',
          700: '#25407a',
        },
        sand: {
          50: '#f7f4ef',
          100: '#f1ece3',
          200: '#e8e1d5',
        },
        gold: {
          300: '#ffd770',
          400: '#ffc94a',
          500: '#ffb81c',
        },
        coral: {
          400: '#d7263d',
          500: '#c60c30',
        },
        teal: {
          400: '#4fc7c7',
          500: '#34b3b3',
        },
      },
      boxShadow: {
        glow: '0 20px 60px -25px rgba(239, 107, 107, 0.5)',
        lift: '0 25px 60px -35px rgba(11, 11, 18, 0.45)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
        'sunset-gradient':
          'linear-gradient(135deg, rgba(0,32,91,0.45), rgba(255,184,28,0.25) 45%, rgba(198,12,48,0.25))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
        reveal: 'reveal 0.9s ease forwards',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
