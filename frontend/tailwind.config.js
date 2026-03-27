/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#D4AF37',
        cream: '#F8F4E9',
        midnight: '#0E1C45',
        ink: '#2D3748',
        mist: '#EEF3FF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        soft: '0 24px 60px rgba(30, 58, 138, 0.12)',
        glow: '0 18px 40px rgba(212, 175, 55, 0.2)',
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top, rgba(212, 175, 55, 0.22), transparent 35%), radial-gradient(circle at bottom right, rgba(30, 58, 138, 0.18), transparent 35%)',
      },
    },
  },
  plugins: [],
};
