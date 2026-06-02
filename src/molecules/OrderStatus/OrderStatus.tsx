import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export type OrderStatusValue =
  | 'pending'
  | 'preparing'
  | 'ready'
  | 'delivered'
  | 'cancelled'
  | 'paid'

const orderStatusVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-semibold border backdrop-blur-sm',
  {
    variants: {
      status: {
        pending:   'bg-white/10   border-white/20   text-white/70',
        preparing: 'bg-amber-500/20 border-amber-500/35 text-amber-300',
        ready:     'bg-green-500/20 border-green-500/35 text-green-300',
        delivered: 'bg-blue-500/20  border-blue-500/35  text-blue-300',
        cancelled: 'bg-red-500/20   border-red-500/35   text-red-300',
        paid:      'bg-purple-500/20 border-purple-500/35 text-purple-300',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
      },
    },
    defaultVariants: { status: 'pending', size: 'md' },
  },
)

const LABELS: Record<OrderStatusValue, string> = {
  pending: 'Pendiente',
  preparing: 'Preparando',
  ready: 'Listo',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  paid: 'Pagado',
}

const DOTS: Record<OrderStatusValue, string> = {
  pending: 'bg-gray-400',
  preparing: 'bg-amber-500 animate-pulse',
  ready: 'bg-green-500',
  delivered: 'bg-blue-500',
  cancelled: 'bg-red-500',
  paid: 'bg-purple-500',
}

export interface OrderStatusProps extends VariantProps<typeof orderStatusVariants> {
  status: OrderStatusValue
  label?: string
  showDot?: boolean
  className?: string
}

export function OrderStatus({
  status,
  label,
  size,
  showDot = true,
  className,
}: OrderStatusProps) {
  return (
    <span className={cn(orderStatusVariants({ status, size }), className)}>
      {showDot && (
        <span className={cn('rounded-full', DOTS[status], size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2')} />
      )}
      {label ?? LABELS[status]}
    </span>
  )
}

export interface OrderStatusStepperProps {
  status: OrderStatusValue
  steps?: OrderStatusValue[]
  className?: string
}

const DEFAULT_STEPS: OrderStatusValue[] = ['pending', 'preparing', 'ready', 'delivered']

export function OrderStatusStepper({
  status,
  steps = DEFAULT_STEPS,
  className,
}: OrderStatusStepperProps) {
  const currentIdx = steps.indexOf(status)

  return (
    <div className={cn('flex items-center gap-0', className)}>
      {steps.map((step, idx) => {
        const isPast = idx < currentIdx
        const isCurrent = idx === currentIdx
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  isPast ? 'bg-caj-primary text-white' : isCurrent ? 'border-2 border-caj-primary text-caj-primary bg-caj-primary/10' : 'border-2 border-white/20 text-white/40',
                )}
              >
                {isPast ? '✓' : idx + 1}
              </div>
              <span className={cn('text-xs font-medium whitespace-nowrap', isCurrent ? 'text-caj-primary' : 'text-white/50')}>
                {LABELS[step]}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={cn('mb-4 h-0.5 w-8 sm:w-12', idx < currentIdx ? 'bg-caj-primary' : 'bg-white/15')} />
            )}
          </div>
        )
      })}
    </div>
  )
}
