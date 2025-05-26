/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        charcoal: '#111214',
        ink: '#E5E5E5',
        accent: {
          pink: '#FFC3D9',
          sky: '#7DD3FC',
        },
      },
      fontFamily: {
        title: ['Stellar Condensed', 'Pretendard', 'sans-serif'],
        body: ['Pretendard', 'sans-serif'],
      },
      borderRadius: {
        card: '32px',
        tile: '16px',
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}; 