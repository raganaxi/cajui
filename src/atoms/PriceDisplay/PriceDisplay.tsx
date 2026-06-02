import { cva, type VariantProps } from 'class-variance-authority'
import { cn, formatCurrency } from '@/lib/utils'

const priceVariants = cva('inline-flex items-baseline gap-1 font-pos tabular-nums', {
  variants: {
    variant: {
      default:   'text-white',
      positive:  'text-caj-primary',
      negative:  'text-caj-danger',
      muted:     'text-white/50',
      highlight: 'text-white font-bold',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
      xl: 'text-3xl',
      '2xl': 'text-4xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface PriceDisplayProps extends VariantProps<typeof priceVariants> {
  value: number
  currency?: string
  locale?: string
  strikethrough?: boolean
  prefix?: string
  suffix?: string
  className?: string
  'aria-label'?: string
}

export function PriceDisplay({
  value,
  currency = 'MXN',
  locale = 'es-MX',
  variant,
  size,
  strikethrough = false,
  prefix,
  suffix,
  className,
  'aria-label': ariaLabel,
}: PriceDisplayProps) {
  const formatted = formatCurrency(value, currency, locale)

  return (
    <span
      className={cn(priceVariants({ variant, size }), strikethrough && 'line-through', className)}
      aria-label={ariaLabel ?? `${formatted}`}
    >
      {prefix && <span className="text-white/50">{prefix}</span>}
      {formatted}
      {suffix && <span className="text-sm text-white/50">{suffix}</span>}
    </span>
  )
}
