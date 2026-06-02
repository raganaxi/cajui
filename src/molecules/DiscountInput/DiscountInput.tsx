import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/atoms/Button'

export type DiscountType = 'percent' | 'fixed'

export interface DiscountInputProps {
  value: number
  type: DiscountType
  subtotal?: number
  currency?: string
  locale?: string
  maxPercent?: number
  onApply: (value: number, type: DiscountType) => void
  onRemove?: () => void
  presets?: number[]
  className?: string
}

export function DiscountInput({
  value,
  type,
  subtotal = 0,
  currency = 'MXN',
  locale = 'es-MX',
  maxPercent = 100,
  onApply,
  onRemove,
  presets,
  className,
}: DiscountInputProps) {
  const [localValue, setLocalValue] = useState(String(value || ''))
  const [localType, setLocalType] = useState<DiscountType>(type)

  const defaultPresets = localType === 'percent' ? [5, 10, 15, 20] : []
  const resolvedPresets = presets ?? defaultPresets

  const numericValue = parseFloat(localValue) || 0
  const discountAmount =
    localType === 'percent'
      ? subtotal * (numericValue / 100)
      : numericValue
  const afterDiscount = Math.max(0, subtotal - discountAmount)
  const isValid = numericValue > 0 && (localType === 'fixed' ? numericValue <= subtotal : numericValue <= maxPercent)

  const fmt = (v: number) => formatCurrency(v, currency, locale)

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Type toggle */}
      <div className="flex rounded-xl border border-white/[0.18] p-0.5 bg-white/[0.08] backdrop-blur-sm">
        {(['percent', 'fixed'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setLocalType(t); setLocalValue('') }}
            className={cn(
              'flex-1 rounded-lg py-1.5 text-sm font-semibold transition-all',
              localType === t
                ? 'bg-white/[0.15] shadow-sm text-white'
                : 'text-white/60 hover:text-white',
            )}
          >
            {t === 'percent' ? 'Porcentaje (%)' : 'Monto fijo'}
          </button>
        ))}
      </div>

      {/* Presets */}
      {resolvedPresets.length > 0 && (
        <div className="flex gap-2">
          {resolvedPresets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setLocalValue(String(p))}
              className={cn(
                'flex-1 rounded-lg border py-1.5 text-sm font-semibold transition-colors',
                localValue === String(p)
                  ? 'border-caj-primary bg-caj-primary/20 text-caj-primary'
                  : 'border-white/[0.18] bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white',
              )}
            >
              {localType === 'percent' ? `${p}%` : fmt(p)}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        <input
          type="number"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          min={0}
          max={localType === 'percent' ? maxPercent : subtotal}
          step={localType === 'percent' ? 1 : 0.01}
          placeholder={localType === 'percent' ? '0%' : '0.00'}
          className="caj-input pr-12 tabular-nums"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-semibold text-white/60">
          {localType === 'percent' ? '%' : currency}
        </span>
      </div>

      {/* Preview */}
      {subtotal > 0 && numericValue > 0 && (
        <div className="rounded-xl border border-white/[0.18] bg-white/[0.08] backdrop-blur-sm px-3 py-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Descuento</span>
            <span className="font-semibold text-caj-danger">-{fmt(discountAmount)}</span>
          </div>
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-white/60">Total después</span>
            <span className="font-bold text-caj-primary">{fmt(afterDiscount)}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="primary"
          block
          onClick={() => isValid && onApply(numericValue, localType)}
          disabled={!isValid}
        >
          Aplicar descuento
        </Button>
        {onRemove && value > 0 && (
          <Button
            variant="danger"
            onClick={onRemove}
          >
            Quitar
          </Button>
        )}
      </div>
    </div>
  )
}
