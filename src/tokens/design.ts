export const designTokens = {
  glass: {
    bg:       'rgba(255, 255, 255, 0.08)',
    bgHover:  'rgba(255, 255, 255, 0.15)',
    bgActive: 'rgba(255, 255, 255, 0.22)',
    border:   'rgba(255, 255, 255, 0.18)',
    shadow:   '0 8px 32px rgba(0, 0, 0, 0.12)',
    inset:    'inset 0 1px 0 rgba(255, 255, 255, 0.25)',
    blur:     'blur(24px) saturate(180%)',
  },
  glassStrong: {
    bg:     'rgba(255, 255, 255, 0.15)',
    border: 'rgba(255, 255, 255, 0.30)',
  },
  glassDark: {
    bg:     'rgba(0, 0, 0, 0.25)',
    border: 'rgba(255, 255, 255, 0.10)',
  },
  gradients: {
    default:  'linear-gradient(135deg, hsl(215 60% 12%) 0%, hsl(250 45% 16%) 50%, hsl(195 55% 14%) 100%)',
    warm:     'linear-gradient(135deg, hsl(220 40% 12%) 0%, hsl(340 45% 16%) 50%, hsl(25 50% 14%) 100%)',
    cool:     'linear-gradient(135deg, hsl(220 50% 12%) 0%, hsl(220 60% 18%) 50%, hsl(190 60% 14%) 100%)',
    midnight: 'linear-gradient(135deg, hsl(240 15% 5%) 0%, hsl(240 20% 8%) 50%, hsl(240 15% 5%) 100%)',
  },
} as const
