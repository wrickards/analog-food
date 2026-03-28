const dir = __dirname.replace(/\\/g, '/')

module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        dir + '/src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        dir + '/src/components/**/*.{js,ts,jsx,tsx,mdx}',
        dir + '/src/app/**/*.{js,ts,jsx,tsx,mdx}',
      ],
      theme: {
        extend: {
          colors: {
            forest: { DEFAULT: '#1E3A2F', light: '#2D5544', dark: '#142819' },
            amber: { DEFAULT: '#C8883A', light: '#DFA55C', dark: '#A66B28' },
            cream: { DEFAULT: '#F9F5EC', dark: '#F0E8D5' },
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
    },
    autoprefixer: {},
  },
}
