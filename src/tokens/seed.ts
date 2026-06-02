export const seedTokens = {
  colorPrimary: [22, 163, 74] as const,
  colorDanger:  [220, 38, 38] as const,
  colorWarning: [217, 119, 6] as const,
  colorSuccess: [22, 163, 74] as const,

  borderRadius: {
    sm:   8,
    md:   12,
    lg:   16,
    xl:   20,
    '2xl': 24,
    full: 9999,
  },

  blur: {
    xs:  '4px',
    sm:  '8px',
    md:  '16px',
    lg:  '24px',
    xl:  '32px',
  },

  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
} as const
