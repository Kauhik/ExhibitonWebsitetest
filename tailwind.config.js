/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          primary: '#050505',
          subtle: '#0f0f0f',
        },
        slate: {
          950: '#05060a',
        },
      },
      boxShadow: {
        pedestal: '0 -60px 120px -80px rgba(5, 5, 5, 0.6)',
      },
    },
  },
  plugins: [],
};
