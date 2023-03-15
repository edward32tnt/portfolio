/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        avatar: 'url(../public/bg2.jpg)'
      },
      keyframes: {
        glowing: {
          '0%': {
            backgroundPosition: '-50vw 0'
          },
          '100%': {
            backgroundPosition: '50vw 0'
          }
        },
        slideScaleEnter: {
          '0%': {
            opacity: 0,
            transform: 'scale(1.1)'
          },
          '100%': {
            opacity: 100,
            transform: 'scale(1)'
          }
        },
        slideScaleLeave: {
          '0%': {
            opacity: 100,
            transform: 'scale(1)'
          },
          '100%': {
            opacity: 0,
            transform: 'scale(1.1)'
          }
        },
        slideUpEnter: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: 100,
            transform: 'translateY(0px)'
          }
        },
        slideUpLeave: {
          '0%': {
            opacity: 100,
            transform: 'translateY(0px)'
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(-20px)'
          }
        }
      }
    },
    animation: {
      slideUpEnter: 'slideUpEnter .3s ease-in-out 1 forwards',
      slideUpLeave: 'slideUpLeave .3s ease-in-out 1 forwards',
      slideScaleEnter: 'slideScaleEnter .3s ease-in-out',
      slideScaleLeave: 'slideScaleLeave .3s ease-in-out',
      glowing: 'glowing 10s linear'
    }
  },
  plugins: [require('tailwindcss-animate'), require('tw-elements/dist/plugin')]
};
