import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { CajuiProvider } from '../src/atoms/CajuiProvider'
import '../src/styles/cajui.css'

import theme from './theme'

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const isFullscreen = context.parameters.layout === 'fullscreen';
      // In Storybook 10, globals.backgrounds is the option key (e.g. 'cajui')
      const bgKey = typeof context.globals.backgrounds === 'string'
        ? context.globals.backgrounds
        : context.globals.backgrounds?.value;

      const THEME_MAP: Record<string, { theme: 'cajui' | 'cajuiOS' | 'accessible' | 'accessible-blue' | 'accessible-dark', gradient: 'default' | 'none' }> = {
        'cajui':              { theme: 'cajui',           gradient: 'default' },
        'cajuiOS':            { theme: 'cajuiOS',         gradient: 'none' },
        'accessible':         { theme: 'accessible',      gradient: 'none' },
        'accessible-blue':    { theme: 'accessible-blue', gradient: 'none' },
        'accessible-dark':    { theme: 'accessible-dark', gradient: 'none' },
      };

      const { theme: activeTheme = 'cajui', gradient: activeGradient = 'default' } = THEME_MAP[bgKey] ?? {};

      return React.createElement(
        CajuiProvider,
        {
          gradient: activeGradient,
          theme: activeTheme,
          className: isFullscreen ? 'min-h-dvh w-full' : 'min-h-0 w-full',
        },
        React.createElement(Story)
      );
    },
  ],

  parameters: {
    backgrounds: {
      options: {
        'cajui':           { name: 'cajui',            value: 'linear-gradient(135deg, hsl(215 60% 12%), hsl(250 45% 16%), hsl(195 55% 14%))' },
        'cajuiOS':         { name: 'cajuiOS',          value: 'linear-gradient(135deg, #f5f3ff 0%, #e0e7ff 50%, #dbeafe 100%)' },
        'accessible':      { name: 'accessible',       value: '#ffffff' },
        'accessible-blue': { name: 'accessible-blue',  value: '#1e3a8a' },
        'accessible-dark': { name: 'accessible-dark',  value: '#121212' },
      },
    },
    viewport: {
      viewports: {
        iphone14: {
          name: 'iPhone 14 (Mobile)',
          styles: { width: '393px', height: '852px' },
          type: 'mobile',
        },
        ipad: {
          name: 'iPad Air (Tablet)',
          styles: { width: '820px', height: '1180px' },
          type: 'tablet',
        },
        ipadPro: {
          name: 'iPad Pro (Tablet)',
          styles: { width: '1024px', height: '1366px' },
          type: 'tablet',
        },
        kiosk: {
          name: 'Kiosk Terminal (Portrait)',
          styles: { width: '1080px', height: '1920px' },
          type: 'other',
        },
        desktop: {
          name: 'POS Desktop (1080p)',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
      defaultViewport: 'responsive',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
      toc: true,
    },
  },

  initialGlobals: {
    backgrounds: 'cajui',
  }
}

export default preview
