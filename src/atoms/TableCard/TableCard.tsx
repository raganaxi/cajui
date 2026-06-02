import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import type { OrderStatusValue } from '@/molecules/OrderStatus/OrderStatus'

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'dirty' | 'paying'
export type TableShape = 'square' | 'round' | 'rectangle'

export interface TableData {
  id: string
  number: number | string
  capacity: number
  status: TableStatus
  orderStatus?: OrderStatusValue
  section?: string
  guests?: number
  timeSeated?: string
  waiter?: string
}

const tableCardVariants = cva(
  'relative flex flex-col items-center justify-center border font-semibold transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-caj-primary active:scale-95 [backdrop-filter:blur(8px)] [-webkit-backdrop-filter:blur(8px)]',
  {
    variants: {
      status: {
        available: 'border-green-500/30 bg-green-500/10 text-green-300 hover:bg-green-500/20 [box-shadow:0_4px_12px_rgba(34,197,94,0.1)]',
        occupied: 'border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20 [box-shadow:0_4px_12px_rgba(239,68,68,0.1)]',
        reserved: 'border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 [box-shadow:0_4px_12px_rgba(245,158,11,0.1)]',
        dirty: 'border-white/10 bg-white/[0.05] text-white/50 hover:bg-white/[0.10]',
        paying: 'border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 [box-shadow:0_4px_12px_rgba(59,130,246,0.1)]',
      },
      shape: {
        square: 'rounded-xl',
        round: 'rounded-full',
        rectangle: 'rounded-xl',
      },
    },
    defaultVariants: { status: 'available', shape: 'square' },
  },
)

const STATUS_LABELS: Record<TableStatus, string> = {
  available: 'Libre',
  occupied: 'Ocupada',
  reserved: 'Reservada',
  dirty: 'Por limpiar',
  paying: 'Pagando',
}

export interface TableCardProps extends VariantProps<typeof tableCardVariants> {
  table: TableData
  onClick?: (table: TableData) => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const TABLE_SIZE = {
  sm: { card: 'w-16 h-16', num: 'text-base', sub: 'text-xs' },
  md: { card: 'w-24 h-24', num: 'text-xl', sub: 'text-xs' },
  lg: { card: 'w-32 h-32', num: 'text-2xl', sub: 'text-sm' },
}

export function TableCard({ table, onClick, shape, size = 'md', className }: TableCardProps) {
  const s = TABLE_SIZE[size]
  return (
    <button
      type="button"
      onClick={() => onClick?.(table)}
      className={cn(tableCardVariants({ status: table.status, shape }), s.card, className)}
      aria-label={`Mesa ${table.number} - ${STATUS_LABELS[table.status]}`}
    >
      <span className={cn('font-bold', s.num)}>{table.number}</span>
      {table.guests && table.status === 'occupied' ? (
        <span className={cn('opacity-75', s.sub)}>{table.guests}/{table.capacity} 👤</span>
      ) : (
        <span className={cn('opacity-60', s.sub)}>{table.capacity} 👤</span>
      )}
      {table.timeSeated && table.status === 'occupied' && (
        <span className={cn('opacity-60', s.sub)}>{table.timeSeated}</span>
      )}
    </button>
  )
}
