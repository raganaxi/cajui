# GOV.UK Design System — cajui Accessible Themes Skill

You are working on the **cajui** component library. This skill governs how to implement, extend, or modify components under the **accessible themes** (`accessible`, `accessible-blue`, `accessible-dark`).

**Single standard: GOV.UK Design System. No mixing with Carbon, MUI, or Ant Design.**

These themes exist for POS/kiosk users who are conservative, elderly, or intimidated by modern glass/iOS aesthetics. They look like classic cash register terminals — functional, unambiguous, zero decoration.

## The two accessible themes

| Theme key | Background | Primary | Use case |
|---|---|---|---|
| `accessible-light` | `#f3f2f1` (slate grey) | `#00703c` green | General retail, bright environments |
| `accessible-dark` | `#0b0c0c` (near-black) | `#ffdd00` yellow | Night, bars, restaurants, low-light |

## GOV.UK color palette

```
#0b0c0c   Black (body text, borders)
#ffffff   White (surfaces, inverted text)
#f3f2f1   Light grey (page backgrounds)
#b1b4b6   Mid grey
#505a5f   Dark grey (muted text)
#1d70b8   Blue (links, info buttons)
#003078   Dark blue (button shadow for blue)
#ffdd00   Yellow (focus ring ALWAYS, accessible-dark primary)
#594800   Dark yellow (button shadow for yellow)
#d4351c   Red (danger/error)
#55140b   Dark red (button shadow for red)
#00703c   Green (success, accessible primary)
#002d18   Dark green (button shadow for green)
#f47738   Orange (warning)
#6e3619   Dark orange (button shadow for warning)
```

## Typography rules

- Font: `Arial, "Helvetica Neue", Helvetica, sans-serif` — **no Inter, no display fonts**
- Body size: `1.1875rem` (19px)
- Line height: `1.47368` (28/19)
- Font-weight max: `700` — **never use 800, 900, or 950**
- Scale: xs=1rem, sm=1.1875rem, base=1.3125rem, lg=1.5rem, xl=1.75rem, 2xl=2rem, 3xl=2.5rem

## Focus ring — non-negotiable

```css
outline: 3px solid #ffdd00;
outline-offset: 0;
```

Yellow on every focused element, no exceptions. This is the GOV.UK signature and the most important accessibility marker.

## Button pattern — GOV.UK press-down 3D

```css
/* Resting */
background: #00703c;
box-shadow: 0 2px 0 #002d18;   /* colored 3D shadow — darker shade of button color */
border-radius: 0;               /* NO radius */
transition: none;               /* NO animations */

/* Active / pressed */
transform: translateY(2px);
box-shadow: none;
```

The `box-shadow` color is always a dark variant of the button's own background. See the palette above for each shadow color.

**Ghost buttons** use `background: transparent` + `border: 2px solid <text-color>` + same shadow.

## Surfaces

All glass classes (`.caj-glass`, `.caj-glass-strong`, `.caj-glass-subtle`) become flat solid surfaces:
```css
background: #ffffff;           /* or theme surface color */
border: 2px solid #0b0c0c;    /* or #ffffff on dark theme */
box-shadow: none;
backdrop-filter: none;
```

## Inputs

```css
border: 2px solid #0b0c0c;   /* 2px — firm, visible boundary */
border-radius: 0;
background: #ffffff;
font-size: 1.1875rem;
transition: none;
/* Focus: */
outline: 3px solid #ffdd00;
outline-offset: 0;
box-shadow: none;
```

## NumPad keys

Same press-down pattern as buttons. Height: `4.8rem`. Font-size: `1.7rem`. Weight: `700`. No radius. No transition.

## CSS token overrides in accessible themes

These token variables must be set in RGB channel format (not hex) because they're used with the `rgb(var(--caj-primary) / opacity)` syntax:

```css
--caj-primary:  0 112 60;    /* #00703c as "R G B" */
--caj-danger:   212 53 28;   /* #d4351c */
```

## Rules — what NOT to do

- No `border-radius` > 0 on buttons, inputs, numkeys, or cards
- No `transition` or `animation` on interactive elements
- No `backdrop-filter` or `blur`
- No `box-shadow` with color glow (only the flat 3D press shadow)
- No font-weight above `700`
- No hardcoded hex colors inside component CSS — use GOV.UK tokens or the variables above
- No mixing GOV.UK patterns with Carbon/MUI/Ant aesthetics

## Adding a new accessible component

1. Apply the shared `[data-cajui-theme^="accessible"]` selector for shared rules
2. Then per-theme selectors for color differences
3. Surface: flat white/dark + 2px solid border
4. Button: GOV.UK press-down with correct shadow color from palette
5. Focus: `outline: 3px solid #ffdd00; outline-offset: 0`
6. Test both themes: `accessible-light`, `accessible-dark`
