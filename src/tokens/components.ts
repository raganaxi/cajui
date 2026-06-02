export const componentTokens = {
  button: {
    height:       { sm: 32, md: 40, lg: 48 },
    borderRadius: 12,
    fontSize:     { sm: '0.75rem', md: '0.875rem', lg: '1rem' },
  },
  input: {
    height:       40,
    borderRadius: 10,
    fontSize:     '0.875rem',
  },
  card: {
    borderRadius: 16,
    padding:      16,
  },
  numKey: {
    height:       56,
    borderRadius: 12,
    fontSize:     '1.125rem',
  },
  badge: {
    borderRadius: 9999,
    fontSize:     '0.75rem',
  },
  table: {
    headerHeight: 40,
    rowHeight:    { compact: 36, default: 48 },
  },
} as const
