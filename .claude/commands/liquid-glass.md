# Liquid Glass — cajui Design System Skill

You are working on the **cajui** component library. This skill governs how to implement, extend, or modify components that use the **Liquid Glass** aesthetic — the default dark glass theme used by `[data-cajui-theme="cajui"]` and `[data-cajui-theme="cajuiOS"]`.

## What Liquid Glass is in cajui

Liquid Glass is a dark-background frosted glass aesthetic inspired by macOS/iOS blur surfaces. It uses backdrop-filter blur + translucent fills to create depth without using heavy shadows or opaque surfaces.

There is **one theme**: `cajui` — dark navy/indigo gradient background, white glass surfaces.

## Core CSS classes

| Class | Use |
|---|---|
| `.caj-glass` | Standard card / panel surface |
| `.caj-glass-strong` | Elevated surface (modals, popovers) |
| `.caj-glass-subtle` | Recessed / secondary surface |
| `.caj-card` | `.caj-glass` + `border-radius: var(--caj-glass-radius)` |

## Key design tokens (CSS variables)

```css
/* Glass surfaces — three levels, all fully tokenized */
--caj-glass-bg / --caj-glass-bg-strong / --caj-glass-bg-subtle
--caj-glass-border / --caj-glass-border-strong / --caj-glass-border-subtle
--caj-glass-blur / --caj-glass-blur-strong / --caj-glass-blur-subtle
--caj-glass-shadow / --caj-glass-shadow-strong
--caj-glass-inset / --caj-glass-inset-strong
--caj-glass-bg-hover     /* hover state (base level) */
--caj-glass-bg-active    /* pressed state (base level) */
--caj-glass-radius       /* surface border-radius: 16px */
--caj-btn-radius         /* interactive element border-radius: 12px */

/* Colors — RGB channels, use with rgb(var(--caj-primary) / opacity) */
--caj-primary / --caj-primary-hover / --caj-primary-light
--caj-danger  / --caj-danger-hover
--caj-warning / --caj-warning-hover
--caj-success / --caj-success-hover
--caj-info    / --caj-info-hover
```

Use `rgb(var(--caj-primary) / 0.8)` syntax for opacity variants — never hardcode colors.
Use `rgb(var(--caj-primary-hover) / 0.9)` for hover states — the `-hover` token is a darker shade of the base color.

## Button classes

`.caj-btn` is the base. Variants: `.caj-btn-primary`, `.caj-btn-success`, `.caj-btn-danger`, `.caj-btn-warning`, `.caj-btn-info`, `.caj-btn-default`, `.caj-btn-ghost`, `.caj-btn-text`

All variants use `backdrop-filter: blur(8px)` and `box-shadow` with colored glow. Focus ring: `focus-visible:ring-2 focus-visible:ring-white/40`.

## Gradients

Background gradients are defined as CSS variables on `:root`:
- `--caj-gradient-default` — navy/indigo/teal
- `--caj-gradient-warm` — navy/rose/amber
- `--caj-gradient-cool` — ocean blue
- `--caj-gradient-midnight` — near-black

Apply with `background: var(--caj-gradient-default)` on `[data-cajui-root]`.

## Rules

1. **Never hardcode rgba colors** — always use token variables
2. **Always include `-webkit-backdrop-filter`** alongside `backdrop-filter`
3. **Respect `prefers-reduced-transparency`** — the base layer already handles it by removing blur and increasing glass-bg opacity; don't override it in components
4. **Text on glass is always `text-white` or `text-white/{opacity}`** — in cajuiOS these get remapped to dark slate via CSS overrides
5. **Border radius** uses `var(--caj-glass-radius)` — never hardcode `rounded-*` on glass surfaces

## Adding a new glass component

1. Use `.caj-glass` for the surface
2. Use `rgb(var(--caj-primary) / <opacity>)` for colored fills
3. Use `border border-white/10` or `border-white/20` for borders
4. Use `text-white/90` for primary text, `text-white/60` for muted
5. Test in both `cajui` (dark) and `cajuiOS` (light) themes
