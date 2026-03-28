const dir = __dirname.replace(/\\/g, '/')

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    dir + '/src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    dir + '/src/components/**/*.{js,ts,jsx,tsx,mdx}',
    dir + '/src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1E3A2F',
          light: '#2D5A3D',
          dark: '#142819',
        },
        'mid-green': '#2D5A3D',
        leaf: '#4A8C5C',
        sage: '#8FAF85',
        amber: {
          DEFAULT: '#C8883A',
          light: '#F0D4A8',
          dark: '#A66B28',
        },
        cream: {
          DEFAULT: '#F5F0E4',
          dark: '#D3C9B0',
        },
        grain: '#D3C9B0',
        'near-black': '#111111',
        'text-dark': '#1A1A1A',
        'text-mid': '#4A5040',
        'text-muted': '#7A8070',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}

module.exports = config
