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

      const THEME_MAP: Record<string, { theme: 'cajui' | 'accessible-light' | 'accessible-dark' | 'amalli-light' | 'amalli-dark' | 'novera', gradient: 'default' | 'warm' | 'cool' | 'midnight' | 'none' }> = {
        'cajui':              { theme: 'cajui',            gradient: 'default'   },
        'cajui-warm':         { theme: 'cajui',            gradient: 'warm'      },
        'cajui-cool':         { theme: 'cajui',            gradient: 'cool'      },
        'cajui-midnight':     { theme: 'cajui',            gradient: 'midnight'  },
        'cajui-none':         { theme: 'cajui',            gradient: 'none'      },
        'accessible-light':   { theme: 'accessible-light', gradient: 'none'      },
        'accessible-dark':    { theme: 'accessible-dark',  gradient: 'none'      },
        'amalli-light':       { theme: 'amalli-light',     gradient: 'none'      },
        'amalli-dark':        { theme: 'amalli-dark',      gradient: 'none'      },
        'novera':             { theme: 'novera',           gradient: 'none'      },
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
        'cajui':           { name: 'cajui — default',   value: 'linear-gradient(135deg, hsl(215 60% 12%) 0%, hsl(250 45% 16%) 50%, hsl(195 55% 14%) 100%)' },
        'cajui-warm':      { name: 'cajui — warm',      value: 'linear-gradient(135deg, hsl(220 40% 12%) 0%, hsl(340 45% 16%) 50%, hsl(25 50% 14%) 100%)' },
        'cajui-cool':      { name: 'cajui — cool',      value: 'linear-gradient(135deg, hsl(220 50% 12%) 0%, hsl(220 60% 18%) 50%, hsl(190 60% 14%) 100%)' },
        'cajui-midnight':  { name: 'cajui — midnight',  value: 'linear-gradient(135deg, hsl(240 15% 5%) 0%, hsl(240 20% 8%) 50%, hsl(240 15% 5%) 100%)' },
        'cajui-none':      { name: 'cajui — sin fondo', value: 'hsl(220 35% 10%)' },
        'accessible-light': { name: 'accessible-light',  value: '#f3f2f1' },
        'accessible-dark':  { name: 'accessible-dark',   value: '#0b0c0c' },
        'amalli-light':     { name: 'amalli — light',    value: '#F2EDE3' },
        'amalli-dark':      { name: 'amalli — dark',     value: '#162318' },
        'novera':           { name: 'novera',            value: '#F4EFE7' },
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
  },
}

export default preview
