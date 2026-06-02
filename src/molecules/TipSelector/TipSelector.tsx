import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'

export interface TipSelectorProps {
  subtotal: number
  currency?: string
  locale?: string
  presets?: number[]
  onSelect: (amount: number, percent: number | null) => void
  className?: string
}

export function TipSelector({
  subtotal,
  currency = 'MXN',
  locale = 'es-MX',
  presets = [10, 15, 20],
  onSelect,
  className,
}: TipSelectorProps) {
  const [selected, setSelected] = useState<number | 'custom' | null>(null)
  const [customValue, setCustomValue] = useState('')

  const fmt = (v: number) => formatCurrency(v, currency, locale)

  function selectPreset(percent: number) {
    setSelected(percent)
    setCustomValue('')
    onSelect(subtotal * (percent / 100), percent)
  }

  function selectNone() {
    setSelected(0)
    setCustomValue('')
    onSelect(0, 0)
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    setCustomValue(raw)
    setSelected('custom')
    const val = parseFloat(raw) || 0
    onSelect(val, null)
  }

  const customAmount = parseFloat(customValue) || 0
  const selectedAmount =
    selected === 'custom'
      ? customAmount
      : selected && selected > 0
      ? subtotal * (selected / 100)
      : 0

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <p className="text-sm font-semibold text-white">Propina</p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={selectNone}
          className={cn(
            'flex-1 rounded-xl border py-2 text-sm font-semibold transition-all',
            selected === 0
              ? 'border-caj-primary bg-caj-primary/20 text-caj-primary'
              : 'border-white/[0.18] bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white',
          )}
        >
          Sin propina
        </button>
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => selectPreset(p)}
            className={cn(
              'flex-1 rounded-xl border py-2 text-sm font-semibold transition-all',
              selected === p
                ? 'border-caj-primary bg-caj-primary/20 text-caj-primary'
                : 'border-white/[0.18] bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white',
            )}
          >
            <span className="block">{p}%</span>
            <span className="block text-xs opacity-75">{fmt(subtotal * (p / 100))}</span>
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative">
        <input
          type="number"
          value={customValue}
          onChange={handleCustomChange}
          onFocus={() => setSelected('custom')}
          placeholder="Monto personalizado"
          min={0}
          step={0.01}
          className={cn(
            'caj-input pr-14',
            selected === 'custom' && 'border-caj-primary ring-2 ring-caj-primary/20',
          )}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-white/60">
          {currency}
        </span>
      </div>

      {/* Total with tip */}
      {selectedAmount > 0 && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-md px-3 py-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-300">Propina</span>
            <span className="font-semibold text-green-300">{fmt(selectedAmount)}</span>
          </div>
          <div className="mt-0.5 flex justify-between text-sm font-bold">
            <span className="text-green-300">Total con propina</span>
            <span className="text-green-300">{fmt(subtotal + selectedAmount)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
