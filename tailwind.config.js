/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': {
            transform: 'translateY(0)',
          },
          '40%': {
            transform: 'translateY(-10px)',
          },
          '60%': {
            transform: 'translateY(-5px)',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#111111',
            lineHeight: '1.8',
            h1: {
              color: '#111111',
              fontWeight: '700',
              fontSize: '2.25em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.2',
            },
            h2: {
              color: '#111111',
              fontWeight: '600',
              fontSize: '1.75em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3',
              paddingBottom: '0.5em',
              borderBottom: '1px solid #e5e7eb',
            },
            h3: {
              color: '#111111',
              fontWeight: '600',
              fontSize: '1.375em',
              marginTop: '1.6em',
              marginBottom: '0.8em',
              lineHeight: '1.4',
            },
            h4: {
              color: '#111111',
              fontWeight: '600',
              fontSize: '1.125em',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': {
                color: '#1d4ed8',
              },
            },
            strong: {
              color: '#111111',
              fontWeight: '600',
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'normal',
              color: '#4b5563',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#e5e7eb',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
            },
            ul: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.625em',
            },
            ol: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              paddingLeft: '1.625em',
            },
            li: {
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            'ul > li': {
              paddingLeft: '0.375em',
            },
            'ol > li': {
              paddingLeft: '0.375em',
            },
            code: {
              color: '#111111',
              fontWeight: '400',
              fontSize: '0.875em',
              backgroundColor: '#f3f4f6',
              padding: '0.25em 0.5em',
              borderRadius: '0.375rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              color: '#111111',
              backgroundColor: '#f3f4f6',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
              color: 'inherit',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
