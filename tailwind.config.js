/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          900: '#134E4A',
          800: '#115E56',
          700: '#0F766E',
        },
        coral: {
          500: '#F87171',
          600: '#EF5350',
          300: '#FCA5A5',
        },
        cream: {
          100: '#FFF7ED',
          200: '#FFEDD5',
        },
        charcoal: {
          900: '#1F2937',
          800: '#374151',
          700: '#4B5563',
        },
      },
      boxShadow: {
        'coral': '0 4px 14px 0 rgba(248, 113, 113, 0.3)',
      },
    },
  },
  plugins: [],
};