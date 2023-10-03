/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      keyframes: {
        transformXFull: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        transformYMinusFull: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        scaleXFull: {
          '0%': { transform: 'scaleX(0%)' },
          '100%': { transform: 'scaleX(100%)' },
        },
      },
      animation: {
        'transform-x-full': 'transformXFull 4s 1s ease-in-out infinite',
        'transform-y-minus-full':
          'transformYMinusFull 2s 2s ease-in-out forwards',
        'scale-x-full': 'scaleXFull 1s 4s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
