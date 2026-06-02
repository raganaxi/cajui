export type CajuiGradient = 'default' | 'warm' | 'cool' | 'midnight' | 'none'

export type CajuiTheme = 'cajui' | 'cajuiOS' | 'accessible' | 'accessible-blue' | 'accessible-dark' | 'dark' | 'light'

export interface CajuiProviderProps {
  children:   React.ReactNode
  gradient?:  CajuiGradient
  className?: string
  style?:     React.CSSProperties
  theme?:     CajuiTheme
}
