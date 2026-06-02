import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/atoms/Button'

export type AttendantReason =
  | 'help'
  | 'age_verification'
  | 'weight_item'
  | 'price_check'
  | 'coupon'
  | 'other'

const REASON_LABELS: Record<AttendantReason, string> = {
  help: 'Necesito ayuda',
  age_verification: 'Verificar edad',
  weight_item: 'Producto por peso',
  price_check: 'Verificar precio',
  coupon: 'Usar cupón / oferta',
  other: 'Otro motivo',
}

const REASON_ICONS: Record<AttendantReason, string> = {
  help: '🙋',
  age_verification: '🪪',
  weight_item: '⚖️',
  price_check: '🏷️',
  coupon: '🎟️',
  other: '💬',
}

export interface AttendantCallProps {
  reasons?: AttendantReason[]
  onCall?: (reason: AttendantReason) => void
  onCancel?: () => void
  waitingMessage?: string
  className?: string
}

/**
 * Self-checkout "call attendant" button and waiting state.
 */
export function AttendantCall({
  reasons = ['help', 'age_verification', 'weight_item', 'price_check', 'coupon', 'other'],
  onCall,
  onCancel,
  waitingMessage = 'Un empleado llegará en un momento…',
  className,
}: AttendantCallProps) {
  const [step, setStep] = useState<'idle' | 'choosing' | 'waiting'>('idle')
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (step !== 'waiting') { setElapsed(0); return }
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [step])

  function callWith(reason: AttendantReason) {
    setStep('waiting')
    onCall?.(reason)
  }

  function cancel() {
    setStep('idle')
    onCancel?.()
  }

  if (step === 'idle') {
    return (
      <Button
        variant="warning"
        onClick={() => setStep('choosing')}
        icon={<span className="text-2xl">🔔</span>}
        className={cn(
          'flex items-center gap-3 rounded-2xl px-5 py-4 h-auto text-amber-200 border-2 border-amber-500/35 bg-amber-500/15 hover:border-amber-500/60 hover:bg-amber-500/25 active:scale-95',
          className
        )}
      >
        Llamar a un empleado
      </Button>
    )
  }

  if (step === 'choosing') {
    return (
      <div className={cn('caj-card flex flex-col gap-3 rounded-2xl p-4', className)}>
        <p className="font-semibold text-white">¿Por qué necesitas ayuda?</p>
        <div className="grid grid-cols-2 gap-2">
          {reasons.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={() => callWith(reason)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.18] bg-white/[0.08] p-3',
                'text-center transition-all hover:border-amber-500/35 hover:bg-amber-500/15 active:scale-95',
              )}
            >
              <span className="text-2xl">{REASON_ICONS[reason]}</span>
              <span className="text-xs font-semibold text-white">{REASON_LABELS[reason]}</span>
            </button>
          ))}
        </div>
        <Button
          variant="text"
          onClick={() => setStep('idle')}
        >
          Cancelar
        </Button>
      </div>
    )
  }

  // Waiting
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-2xl border-2 border-amber-500/35',
        'bg-amber-500/15 backdrop-blur-md p-6 text-center',
        className,
      )}
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="text-4xl">🔔</span>
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
          !
        </span>
      </div>
      <div>
        <p className="text-lg font-bold text-amber-200">Empleado notificado</p>
        <p className="text-sm text-amber-200/80">{waitingMessage}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-amber-300">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-500" />
        Esperando… {elapsed > 0 && `(${elapsed}s)`}
      </div>
      {onCancel && (
        <Button
          variant="text"
          onClick={cancel}
          className="text-amber-300 hover:text-amber-200 hover:no-underline"
        >
          Ya no necesito ayuda
        </Button>
      )}
    </div>
  )
}
