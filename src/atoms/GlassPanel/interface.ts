export type GlassPanelBlur     = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type GlassPanelTint     = 'white' | 'primary' | 'danger' | 'warning' | 'dark' | 'none'
export type GlassPanelStrength = 'subtle' | 'medium' | 'strong'
export type GlassPanelRadius   = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface GlassPanelProps {
  children?: React.ReactNode
  blur?:     GlassPanelBlur
  tint?:     GlassPanelTint
  strength?: GlassPanelStrength
  radius?:   GlassPanelRadius
  padding?:  boolean | 'sm' | 'md' | 'lg'
  shadow?:   boolean
  className?: string
  as?: keyof JSX.IntrinsicElements
  onClick?: () => void
  style?: React.CSSProperties
}
