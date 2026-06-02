import { cn } from '@/lib/utils'
import { designTokens } from '@/tokens'
import type { CajuiProviderProps } from './interface'

const GRADIENTS: Record<string, string> = {
  default:  designTokens.gradients.default,
  warm:     designTokens.gradients.warm,
  cool:     designTokens.gradients.cool,
  midnight: designTokens.gradients.midnight,
  none:     '',
}

/**
 * Root wrapper for cajui apps.
 * Injects the glass gradient background and the `data-cajui-root` attribute
 * needed for scoped base styles.
 *
 * Place it at the top of your component tree:
 * ```tsx
 * <CajuiProvider gradient="default">
 *   <MyPOSApp />
 * </CajuiProvider>
 * ```
 */
export function CajuiProvider({
  children,
  gradient = 'default',
  className,
  style,
  theme = 'cajui',
}: CajuiProviderProps) {
  // Normalize theme for data-attributes and styling compat
  const activeTheme = theme === 'dark' ? 'cajui' : theme === 'light' ? 'cajuiOS' : theme

  // Accessible themes do not use backgrounds gradients
  const activeGradient = activeTheme.startsWith('accessible') ? 'none' : gradient
  const bg = GRADIENTS[activeGradient] ?? ''

  return (
    <div
      data-cajui-root
      data-cajui-theme={activeTheme}
      className={cn('min-h-dvh w-full font-pos', className)}
      style={{
        ...(bg ? { background: bg } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  )
}
