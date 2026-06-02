import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const trendVariants = cva('inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold', {
  variants: {
    trend: {
      up: 'bg-green-500/20 border border-green-500/30 text-green-300',
      down: 'bg-red-500/20 border border-red-500/30 text-red-300',
      neutral: 'bg-white/[0.12] border border-white/[0.18] text-white/70',
    },
  },
})

export type KPITrend = 'up' | 'down' | 'neutral'

export interface KPICardProps {
  label: string
  value: string | number
  previousValue?: string | number
  trend?: KPITrend
  trendLabel?: string
  icon?: React.ReactNode
  color?: 'default' | 'green' | 'blue' | 'amber' | 'red' | 'purple'
  description?: string
  className?: string
}

const ICON_BG = {
  default: 'bg-white/[0.12] text-white/70',
  green: 'bg-green-500/15 text-green-300',
  blue: 'bg-blue-500/15 text-blue-300',
  amber: 'bg-amber-500/15 text-amber-300',
  red: 'bg-red-500/15 text-red-300',
  purple: 'bg-purple-500/15 text-purple-300',
}

function TrendArrow({ trend }: { trend: KPITrend }) {
  if (trend === 'up') return <span>↑</span>
  if (trend === 'down') return <span>↓</span>
  return <span>→</span>
}

export function KPICard({
  label,
  value,
  previousValue,
  trend,
  trendLabel,
  icon,
  color = 'default',
  description,
  className,
}: KPICardProps) {
  const changePercent =
    trend === undefined &&
    typeof value === 'number' &&
    typeof previousValue === 'number' &&
    previousValue !== 0
      ? ((value - previousValue) / Math.abs(previousValue)) * 100
      : null

  const derivedTrend: KPITrend | undefined =
    trend ??
    (changePercent !== null
      ? changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'neutral'
      : undefined)

  return (
    <div className={cn('caj-card flex flex-col gap-3 p-4', className)}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-white/60">{label}</p>
        {icon && (
          <span className={cn('flex h-9 w-9 items-center justify-center rounded-lg', ICON_BG[color])}>
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold tabular-nums text-caj-text">{value}</span>
        {derivedTrend && (
          <span className={cn(trendVariants({ trend: derivedTrend }), 'mb-0.5')}>
            <TrendArrow trend={derivedTrend} />
            {trendLabel ??
              (changePercent !== null ? `${Math.abs(changePercent).toFixed(1)}%` : '')}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-caj-text-muted">{description}</p>
      )}
    </div>
  )
}
