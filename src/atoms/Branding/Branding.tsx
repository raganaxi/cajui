import React from 'react';
import { BrandingProps } from './interface';
import { cn } from '@/lib/utils';
import { GlassPanel } from '@/atoms/GlassPanel';

/**
 * Helper to convert standard hex colors or rgb colors to space-separated RGB channels
 * required by the `--caj-primary` Tailwind/CSS variables configuration.
 */
export function colorToRgbChannels(color?: string): string | null {
  if (!color) return null;
  const trimmed = color.trim();

  // Try hex
  let hex = trimmed.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
      return `${r} ${g} ${b}`;
    }
  }

  // Try rgb(...)
  const rgbMatch = trimmed.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
  if (rgbMatch) {
    return `${rgbMatch[1]} ${rgbMatch[2]} ${rgbMatch[3]}`;
  }

  // Try space-separated numbers already (e.g. "79 70 229")
  if (/^\d+\s+\d+\s+\d+$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function Branding({
  companyName,
  logoUrl,
  themeColor,
  size = 'md',
  glassTint = false,
  className,
}: BrandingProps) {
  const rgbChannels = colorToRgbChannels(themeColor);
  const containerStyle = rgbChannels
    ? ({ '--caj-primary': rgbChannels } as React.CSSProperties)
    : undefined;

  // Determine size classes
  const sizeClasses = {
    sm: {
      container: 'gap-2.5',
      logo: 'h-8 w-auto max-w-[120px]',
      fallbackLogo: 'w-7 h-7',
      text: 'text-lg font-bold tracking-tight',
    },
    md: {
      container: 'gap-4',
      logo: 'h-12 w-auto max-w-[180px]',
      fallbackLogo: 'w-10 h-10',
      text: 'text-2xl font-extrabold tracking-tight',
    },
    lg: {
      container: 'gap-6',
      logo: 'h-16 w-auto max-w-[240px]',
      fallbackLogo: 'w-14 h-14',
      text: 'text-4xl font-black tracking-tight',
    },
  }[size];

  // Default Abstract Glowing Logo SVG
  const renderFallbackLogo = () => (
    <svg
      className={cn('text-caj-primary animate-pulse filter drop-shadow-[0_0_12px_rgba(var(--caj-primary),0.6)]', sizeClasses.fallbackLogo)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--caj-primary))" />
          <stop offset="100%" stopColor="rgb(var(--caj-primary) / 0.4)" />
        </linearGradient>
      </defs>
      {/* Outer hexagon */}
      <polygon
        points="50,5 90,28 90,72 50,95 10,72 10,28"
        stroke="currentColor"
        strokeWidth="4"
        fill="url(#logo-grad)"
        fillOpacity="0.15"
      />
      {/* Intersecting triangle */}
      <polygon
        points="50,20 80,70 20,70"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinejoin="round"
        fill="url(#logo-grad)"
        fillOpacity="0.3"
      />
      {/* Center glowing core */}
      <circle cx="50" cy="53" r="10" fill="currentColor" />
    </svg>
  );

  const innerContent = (
    <div className={cn('flex items-center', sizeClasses.container)}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${companyName} logo`}
          className={cn('object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]', sizeClasses.logo)}
        />
      ) : (
        renderFallbackLogo()
      )}
      <span
        className={cn(
          'text-white',
          sizeClasses.text
        )}
      >
        {companyName}
      </span>
    </div>
  );

  if (glassTint) {
    return (
      <GlassPanel
        tint="primary"
        strength="subtle"
        padding="md"
        radius="lg"
        style={containerStyle}
        className={cn('inline-flex items-center justify-center border-caj-primary/20 backdrop-blur-md', className)}
      >
        {innerContent}
      </GlassPanel>
    );
  }

  return (
    <div
      style={containerStyle}
      className={cn('inline-flex items-center justify-center', className)}
    >
      {innerContent}
    </div>
  );
}
