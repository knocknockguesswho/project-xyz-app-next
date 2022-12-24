module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
  },
  theme: {
    extend: {
      colors: {
        darkBlue: '#1E3273',
        blue: '#4488C1',
        grey: '#636474',
        neutral: '#2D2F4490',
        mild: '#C4C4C4',
        black: '#14162E',
        overlay: '#22222225',
        white: '#FFFFFF',
        transparent: 'transparent'
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        normal: '1px 3px 10px rgba(0, 0, 0, 0.10)',
        medium: '1px 3px 10px rgba(0, 0, 0, 0.25)',
        heavy: '1px 3px 5px rgba(0, 0, 0, 0.27)',
        hover: '3px 3px 6px rgba(34, 34, 34, 0.25)',
        select: '0px 1px 6px rgba(48, 127, 226, 0.18)'
      },
      screens: {
        mini: '0px',
        phone: '360px',
        tablet: '768px',
        'small-desktop': '1200px',
        desktop: '1650px',
      },
      zIndex: {
        100: 100
      },
      inset: {
        '1/2': '50%',
        '3/4': '75%'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ]
};
