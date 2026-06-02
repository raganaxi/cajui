import { cn } from '@/lib/utils'

export type PaymentType = 'cash' | 'card' | 'transfer' | 'credit' | 'voucher' | 'other'

const ICONS: Record<PaymentType, React.ReactNode> = {
  cash: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  card: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  transfer: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  credit: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  voucher: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  ),
  other: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  ),
}

const DEFAULT_LABELS: Record<PaymentType, string> = {
  cash: 'Efectivo',
  card: 'Tarjeta',
  transfer: 'Transferencia',
  credit: 'Crédito',
  voucher: 'Vale / Cupón',
  other: 'Otro',
}

export interface PaymentMethodProps {
  method: PaymentType
  label?: string
  selected?: boolean
  disabled?: boolean
  onSelect?: (method: PaymentType) => void
  className?: string
}

export interface PaymentMethodGroupProps {
  methods?: PaymentType[]
  value?: PaymentType | null
  onChange?: (method: PaymentType) => void
  disabled?: boolean
  className?: string
}

export function PaymentMethod({
  method,
  label,
  selected = false,
  disabled = false,
  onSelect,
  className,
}: PaymentMethodProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(method)}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 p-3',
        'min-w-[80px] transition-all duration-100 focus-visible:outline-none',
        'focus-visible:ring-2 focus-visible:ring-caj-primary active:scale-95',
        selected
          ? 'border-caj-primary/60 bg-caj-primary/20 text-caj-primary backdrop-blur-sm [box-shadow:0_0_16px_rgb(var(--caj-primary)/0.25)]'
          : 'border-white/[0.18] bg-white/[0.08] backdrop-blur-sm text-white/60 hover:bg-white/[0.15] hover:text-white hover:border-white/[0.30]',
        disabled && 'pointer-events-none opacity-40',
        className,
      )}
      aria-pressed={selected}
      aria-label={label ?? DEFAULT_LABELS[method]}
    >
      {ICONS[method]}
      <span className={cn('text-xs font-semibold', selected ? 'text-caj-primary' : 'text-white')}>
        {label ?? DEFAULT_LABELS[method]}
      </span>
    </button>
  )
}

export function PaymentMethodGroup({
  methods = ['cash', 'card', 'transfer', 'credit'],
  value,
  onChange,
  disabled = false,
  className,
}: PaymentMethodGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} role="group" aria-label="Método de pago">
      {methods.map((m) => (
        <PaymentMethod
          key={m}
          method={m}
          selected={value === m}
          onSelect={onChange}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
