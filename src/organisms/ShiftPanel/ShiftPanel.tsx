import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { Button } from '@/atoms/Button'

export type ShiftStatus = 'closed' | 'open'

export interface ShiftSummary {
  sales: number
  transactions: number
  returns: number
  openingCash: number
  closingCash?: number
  cashInDrawer?: number
  operator?: string
  openedAt?: string
  closedAt?: string
}

export interface ShiftPanelProps {
  status: ShiftStatus
  summary?: ShiftSummary
  currency?: string
  locale?: string
  onOpen?: (openingCash: number) => void
  onClose?: (closingCash: number) => void
  className?: string
}

export function ShiftPanel({
  status,
  summary,
  currency = 'MXN',
  locale = 'es-MX',
  onOpen,
  onClose,
  className,
}: ShiftPanelProps) {
  const [cashInput, setCashInput] = useState('')
  const fmt = (v: number) => formatCurrency(v, currency, locale)
  const cashValue = parseFloat(cashInput) || 0

  return (
    <div className={cn('caj-card flex flex-col overflow-hidden', className)}>
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-5 py-4',
          status === 'open'
            ? 'bg-green-500/10'
            : 'bg-white/[0.05]',
        )}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Turno</p>
          <p className={cn('text-lg font-bold', status === 'open' ? 'text-green-300' : 'text-white')}>
            {status === 'open' ? '● Turno abierto' : '○ Turno cerrado'}
          </p>
          {summary?.operator && (
            <p className="text-sm text-white/60">{summary.operator}</p>
          )}
        </div>
        {summary?.openedAt && (
          <div className="text-right">
            <p className="text-xs text-white/60">Apertura</p>
            <p className="text-sm font-semibold text-white">{summary.openedAt}</p>
          </div>
        )}
      </div>

      {/* Summary rows */}
      {summary && (
        <div className="divide-y divide-white/[0.10]">
          <SummaryRow label="Fondo inicial" value={fmt(summary.openingCash)} />
          <SummaryRow label="Ventas del turno" value={fmt(summary.sales)} highlight />
          <SummaryRow label="Transacciones" value={String(summary.transactions)} />
          {summary.returns > 0 && (
            <SummaryRow label="Devoluciones" value={fmt(summary.returns)} danger />
          )}
          {summary.cashInDrawer !== undefined && (
            <SummaryRow label="Efectivo en caja" value={fmt(summary.cashInDrawer)} />
          )}
          {summary.closingCash !== undefined && (
            <SummaryRow
              label="Diferencia"
              value={fmt(summary.closingCash - summary.openingCash - summary.sales + summary.returns)}
            />
          )}
        </div>
      )}

      {/* Action */}
      <div className="p-4">
        <div className="mb-3">
          <label className="mb-1.5 block text-sm font-medium text-white">
            {status === 'open' ? 'Efectivo en caja al cierre' : 'Fondo de apertura'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={cashInput}
              onChange={(e) => setCashInput(e.target.value)}
              placeholder="0.00"
              min={0}
              step={0.01}
              className="caj-input pr-14 tabular-nums"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm font-medium text-white/60">
              {currency}
            </span>
          </div>
        </div>

        {status === 'open' ? (
          <Button
            variant="danger"
            block
            size="lg"
            onClick={() => cashValue > 0 && onClose?.(cashValue)}
            disabled={cashValue <= 0}
          >
            Cerrar turno
          </Button>
        ) : (
          <Button
            variant="primary"
            block
            size="lg"
            onClick={() => cashValue > 0 && onOpen?.(cashValue)}
            disabled={cashValue <= 0}
          >
            Abrir turno
          </Button>
        )}
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  highlight,
  danger,
}: {
  label: string
  value: string
  highlight?: boolean
  danger?: boolean
}) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5">
      <span className="text-sm text-white/60">{label}</span>
      <span
        className={cn(
          'text-sm font-semibold tabular-nums',
          highlight ? 'text-caj-primary' : danger ? 'text-caj-danger' : 'text-white',
        )}
      >
        {value}
      </span>
    </div>
  )
}
