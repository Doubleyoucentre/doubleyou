// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0E1B2E',
          light: '#162438',
          50: '#EEF2F8',
        },
        gold: {
          DEFAULT: '#F7C928',
          light: '#FEF9C3',
        },
        labari: {
          DEFAULT: '#16A34A',
          light: '#F0FDF4',
        },
        innov: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
        },
      },
      keyframes: {
        pulseGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseGradient: 'pulseGradient 4s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
};
