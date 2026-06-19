import { create } from 'storybook/theming/create';

export default create({
  base: 'dark',

  // Typography
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  // Brand
  brandTitle: 'cajui POS Component Library',
  brandUrl: 'https://github.com/raganaxi/cajui',
  brandImage: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2322c55e"/><stop offset="100%" stop-color="%2310b981"/></linearGradient></defs><text x="10" y="28" font-family="system-ui" font-weight="900" font-size="28" fill="url(%23g)">cajui</text><circle cx="95" cy="16" r="4" fill="%233b82f6"/></svg>',
  brandTarget: '_self',

  // Accent Colors
  colorPrimary: '#22c55e',   // caj-primary (green)
  colorSecondary: '#22c55e', // selection color

  // UI Theme Colors
  appBg: '#090c15',          // Deep space sidebar background
  appContentBg: '#0e1220',   // Main preview workspace area background
  appBorderColor: 'rgba(255, 255, 255, 0.08)',
  appBorderRadius: 16,

  // Text Colors
  textColor: '#ffffff',
  textInverseColor: '#090c15',
  textMutedColor: 'rgba(255, 255, 255, 0.55)',

  // Toolbar & Tab Colors
  barTextColor: 'rgba(255, 255, 255, 0.6)',
  barSelectedColor: '#22c55e',
  barBg: '#0e1220',

  // Input Fields Form styling
  inputBg: 'rgba(255, 255, 255, 0.03)',
  inputBorder: 'rgba(255, 255, 255, 0.08)',
  inputTextColor: '#ffffff',
  inputBorderRadius: 10,
});
