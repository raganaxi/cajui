import { cn } from '@/lib/utils'

type NumPadKey =
  | '1' | '2' | '3'
  | '4' | '5' | '6'
  | '7' | '8' | '9'
  | '00' | '0' | '.'
  | 'backspace' | 'clear' | 'enter'

interface NumPadKeyConfig {
  key: NumPadKey
  label: string
  colSpan?: number
  style?: 'default' | 'action' | 'enter' | 'danger'
}

const KEYS: NumPadKeyConfig[] = [
  { key: '7', label: '7' },
  { key: '8', label: '8' },
  { key: '9', label: '9' },
  { key: 'backspace', label: '⌫', style: 'action' },

  { key: '4', label: '4' },
  { key: '5', label: '5' },
  { key: '6', label: '6' },
  { key: 'clear', label: 'C', style: 'danger' },

  { key: '1', label: '1' },
  { key: '2', label: '2' },
  { key: '3', label: '3' },
  { key: 'enter', label: '✓', style: 'enter' },

  { key: '0', label: '0' },
  { key: '00', label: '00', style: 'action' },
  { key: '.', label: '.', style: 'action' },
]

const KEY_STYLES: Record<Required<NumPadKeyConfig>['style'], string> = {
  default: 'caj-numkey',
  action: 'caj-numkey-action',
  enter: 'caj-numkey-enter row-span-2 h-full',
  danger: 'caj-numkey bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 active:bg-red-500/40',
}

export interface NumPadProps {
  value: string
  onChange: (value: string) => void
  onEnter?: (value: string) => void
  maxDecimals?: number
  maxLength?: number
  allowDecimals?: boolean
  disabled?: boolean
  className?: string
}

export function NumPad({
  value,
  onChange,
  onEnter,
  maxDecimals = 2,
  maxLength = 10,
  allowDecimals = true,
  disabled = false,
  className,
}: NumPadProps) {
  function handleKey(key: NumPadKey) {
    if (disabled) return

    if (key === 'clear') {
      onChange('')
      return
    }

    if (key === 'backspace') {
      onChange(value.slice(0, -1))
      return
    }

    if (key === 'enter') {
      onEnter?.(value)
      return
    }

    if (key === '.' && !allowDecimals) return
    if (key === '.' && value.includes('.')) return

    const [, dec] = value.split('.')
    if (dec !== undefined && dec.length >= maxDecimals) return

    if (value.replace('.', '').length >= maxLength) return

    // Avoid leading zeros except for "0."
    if (value === '0' && key !== '.' && key !== '00') {
      onChange(key)
      return
    }

    onChange(value + key)
  }

  return (
    <div
      className={cn('grid grid-cols-4 gap-1.5 w-full', className)}
      role="group"
      aria-label="Teclado numérico"
    >
      {KEYS.map(({ key, label, style = 'default' }) => (
        <button
          key={key}
          type="button"
          onClick={() => handleKey(key)}
          disabled={disabled}
          className={cn(
            KEY_STYLES[style],
            disabled && 'pointer-events-none opacity-50',
          )}
          aria-label={key === 'backspace' ? 'Borrar último' : key === 'clear' ? 'Limpiar' : key === 'enter' ? 'Confirmar' : label}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
