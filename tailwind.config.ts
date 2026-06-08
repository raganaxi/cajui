import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        caj: {
          primary:       'rgb(var(--caj-primary) / <alpha-value>)',
          'primary-hover': 'rgb(var(--caj-primary-hover) / <alpha-value>)',
          'primary-light': 'rgb(var(--caj-primary-light) / <alpha-value>)',
          danger:        'rgb(var(--caj-danger) / <alpha-value>)',
          'danger-hover': 'rgb(var(--caj-danger-hover) / <alpha-value>)',
          warning:       'rgb(var(--caj-warning) / <alpha-value>)',
          success:       'rgb(var(--caj-success) / <alpha-value>)',
          text:          'rgb(var(--caj-text) / <alpha-value>)',
          'text-muted':  'rgb(var(--caj-text-muted) / <alpha-value>)',
          border:        'rgb(var(--caj-border) / <alpha-value>)',
        },
      },

      /* Glass-specific backdrop blurs */
      backdropBlur: {
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '32px',
        '2xl': '48px',
      },

      /* Glass box shadows */
      boxShadow: {
        glass:    '0 8px 32px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.25)',
        'glass-sm': '0 4px 16px rgba(0,0,0,0.10)',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.30)',
        primary:  '0 4px 16px rgb(var(--caj-primary) / 0.35)',
        danger:   '0 4px 16px rgb(var(--caj-danger) / 0.35)',
      },

      /* Larger radii for glass aesthetic */
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },

      fontFamily: {
        pos:  ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      keyframes: {
        press: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(0.95)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glass-in': {
          '0%':   { opacity: '0', transform: 'scale(0.96) translateY(4px)', backdropFilter: 'blur(0px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)', backdropFilter: 'blur(24px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
      },
      animation: {
        press:     'press 0.1s ease-in-out',
        'scan-line': 'scan-line 1.5s ease-in-out infinite',
        shimmer:   'shimmer 2s infinite linear',
        'glass-in': 'glass-in 0.25s ease-out forwards',
        shake:     'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config
