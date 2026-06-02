import { cn, formatCurrency } from '@/lib/utils'
import type { CartItemData } from '@/molecules/CartItem/CartItem'
import { Button } from '@/atoms/Button'

export interface CartSummaryProps {
  items: CartItemData[]
  taxRate?: number
  discount?: number
  discountType?: 'percent' | 'fixed'
  currency?: string
  locale?: string
  onCheckout?: (total: number) => void
  checkoutLabel?: string
  disabled?: boolean
  className?: string
}

function Row({
  label,
  value,
  bold,
  large,
  muted,
}: {
  label: string
  value: string
  bold?: boolean
  large?: boolean
  muted?: boolean
}) {
  return (
    <div className={cn('flex items-center justify-between', large ? 'py-2' : 'py-1')}>
      <span className={cn('text-sm', muted ? 'text-white/60' : 'text-white', bold && 'font-semibold')}>
        {label}
      </span>
      <span
        className={cn(
          'tabular-nums',
          large ? 'text-xl font-bold text-caj-primary' : 'text-sm',
          bold ? 'font-semibold text-white' : 'text-white',
          muted && 'text-white/60',
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function CartSummary({
  items,
  taxRate = 0,
  discount = 0,
  discountType = 'percent',
  currency = 'MXN',
  locale = 'es-MX',
  onCheckout,
  checkoutLabel = 'Cobrar',
  disabled = false,
  className,
}: CartSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => {
      const unitPrice = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price
      return acc + unitPrice * item.quantity
    },
    0,
  )

  const discountAmount =
    discountType === 'percent' ? subtotal * (discount / 100) : discount

  const afterDiscount = subtotal - discountAmount
  const taxAmount = afterDiscount * (taxRate / 100)
  const total = afterDiscount + taxAmount
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0)

  const fmt = (v: number) => formatCurrency(v, currency, locale)

  return (
    <div className={cn('caj-card flex flex-col gap-0 overflow-hidden', className)}>
      <div className="border-b border-white/[0.12] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Resumen ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})
        </p>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.10] px-4">
        <div className="py-2">
          <Row label="Subtotal" value={fmt(subtotal)} />
          {discount > 0 && (
            <Row
              label={`Descuento${discountType === 'percent' ? ` (${discount}%)` : ''}`}
              value={`-${fmt(discountAmount)}`}
              muted
            />
          )}
          {taxRate > 0 && (
            <Row label={`IVA (${taxRate}%)`} value={fmt(taxAmount)} muted />
          )}
        </div>
        <div className="py-1">
          <Row label="Total" value={fmt(total)} bold large />
        </div>
      </div>

      {onCheckout && (
        <div className="px-4 pb-4 pt-3">
          <Button
            variant="primary"
            size="lg"
            block
            onClick={() => onCheckout(total)}
            disabled={disabled || items.length === 0}
          >
            {checkoutLabel} — {fmt(total)}
          </Button>
        </div>
      )}
    </div>
  )
}
