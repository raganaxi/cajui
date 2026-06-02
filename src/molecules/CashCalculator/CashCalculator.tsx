import { useState, useMemo } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { NumPad } from '../../atoms/NumPad/NumPad'
import { Button } from '@/atoms/Button'

const MXN_DENOMINATIONS = [
  { value: 1000, label: '$1,000' },
  { value: 500, label: '$500' },
  { value: 200, label: '$200' },
  { value: 100, label: '$100' },
  { value: 50, label: '$50' },
  { value: 20, label: '$20' },
  { value: 10, label: '$10' },
  { value: 5, label: '$5' },
  { value: 2, label: '$2' },
  { value: 1, label: '$1' },
]

const USD_DENOMINATIONS = [
  { value: 100, label: '$100' },
  { value: 50, label: '$50' },
  { value: 20, label: '$20' },
  { value: 10, label: '$10' },
  { value: 5, label: '$5' },
  { value: 1, label: '$1' },
  { value: 0.25, label: '25¢' },
  { value: 0.1, label: '10¢' },
]

const DENOMINATIONS: Record<string, typeof MXN_DENOMINATIONS> = {
  MXN: MXN_DENOMINATIONS,
  USD: USD_DENOMINATIONS,
}

export interface CashCalculatorProps {
  total: number
  currency?: string
  locale?: string
  onConfirm?: (tendered: number, change: number) => void
  className?: string
}

export function CashCalculator({
  total,
  currency = 'MXN',
  locale = 'es-MX',
  onConfirm,
  className,
}: CashCalculatorProps) {
  const [numpadValue, setNumpadValue] = useState('')
  const denoms = DENOMINATIONS[currency] ?? MXN_DENOMINATIONS

  const tendered = numpadValue ? parseFloat(numpadValue) : 0
  const change = Math.max(0, tendered - total)
  const isEnough = tendered >= total

  const changeBreakdown = useMemo(() => {
    if (!isEnough || change === 0) return []
    let remaining = Math.round(change * 100)
    const result: { denom: number; label: string; count: number }[] = []
    for (const d of denoms) {
      const unit = Math.round(d.value * 100)
      const count = Math.floor(remaining / unit)
      if (count > 0) {
        result.push({ denom: d.value, label: d.label, count })
        remaining -= count * unit
      }
    }
    return result
  }, [change, denoms, isEnough])

  const fmt = (v: number) => formatCurrency(v, currency, locale)

  function quickTender(amount: number) {
    setNumpadValue(String(amount))
  }

  const quickAmounts = denoms
    .map((d) => d.value)
    .filter((v) => v >= total)
    .slice(0, 4)

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {/* Total */}
      <div className="rounded-2xl border border-white/[0.18] bg-white/[0.08] backdrop-blur-md p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Total a cobrar</p>
        <p className="mt-1 text-3xl font-bold tabular-nums text-caj-primary">{fmt(total)}</p>
      </div>

      {/* Quick amounts */}
      {quickAmounts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickAmounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => quickTender(a)}
              className={cn(
                'rounded-xl border border-white/[0.18] bg-white/[0.08] backdrop-blur-sm px-3 py-1.5 text-sm font-semibold',
                'text-white/70 hover:bg-white/[0.15] hover:text-white transition-colors',
                numpadValue === String(a) && 'border-caj-primary bg-caj-primary/20 text-caj-primary',
              )}
            >
              {fmt(a)}
            </button>
          ))}
        </div>
      )}

      {/* NumPad */}
      <div>
        <p className="mb-1.5 text-xs font-medium text-white/60">Efectivo recibido</p>
        <div className="rounded-xl border border-white/[0.18] bg-white/[0.08] backdrop-blur-md p-2 text-right mb-2">
          <span className="font-mono text-xl font-bold text-white">
            {numpadValue ? fmt(tendered) : '—'}
          </span>
        </div>
        <NumPad value={numpadValue} onChange={setNumpadValue} />
      </div>

      {/* Change */}
      <div
        className={cn(
          'rounded-xl border p-4 backdrop-blur-md',
          isEnough && tendered > 0
            ? 'border-green-500/30 bg-green-500/10'
            : tendered > 0
            ? 'border-red-500/30 bg-red-500/10'
            : 'border-white/[0.18] bg-white/[0.08]',
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">Cambio</span>
          <span
            className={cn(
              'text-2xl font-bold tabular-nums',
              isEnough && tendered > 0 ? 'text-green-300' : 'text-white/60',
            )}
          >
            {isEnough && tendered > 0 ? fmt(change) : '—'}
          </span>
        </div>

        {/* Breakdown */}
        {changeBreakdown.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 border-t border-green-500/30 pt-3">
            {changeBreakdown.map((b) => (
              <span
                key={b.denom}
                className="inline-flex items-center gap-1 rounded-full bg-green-500/20 border border-green-500/30 px-2.5 py-0.5 text-xs font-semibold text-green-300"
              >
                {b.label} × {b.count}
              </span>
            ))}
          </div>
        )}

        {tendered > 0 && !isEnough && (
          <p className="mt-1 text-xs text-red-300">
            Faltan {fmt(total - tendered)}
          </p>
        )}
      </div>

      {/* Confirm */}
      {onConfirm && (
        <Button
          variant="primary"
          size="lg"
          block
          onClick={() => isEnough && onConfirm(tendered, change)}
          disabled={!isEnough || tendered === 0}
        >
          Confirmar cobro {isEnough && tendered > 0 ? `— cambio ${fmt(change)}` : ''}
        </Button>
      )}
    </div>
  )
}
