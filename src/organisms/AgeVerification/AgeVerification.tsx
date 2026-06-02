import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/atoms/Button'

export interface AgeVerificationProps {
  minAge?: number
  productName?: string
  onApprove: () => void
  onDeny: () => void
  requireStaff?: boolean
  className?: string
}

/**
 * Age verification modal for restricted products (alcohol, tobacco) in self-checkout kiosks.
 */
export function AgeVerification({
  minAge = 18,
  productName,
  onApprove,
  onDeny,
  requireStaff = false,
  className,
}: AgeVerificationProps) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 rounded-2xl border border-amber-500/35',
        'bg-amber-500/15 backdrop-blur-md p-8 text-center',
        className,
      )}
      role="alertdialog"
      aria-modal
    >
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-amber-500/50 bg-amber-500/20 text-4xl backdrop-blur-sm">
        🔞
      </div>

      <div>
        <h2 className="text-xl font-bold text-amber-200">
          Verificación de edad
        </h2>
        {productName && (
          <p className="mt-1 text-sm text-amber-200/80">
            <strong>{productName}</strong> requiere verificación de edad
          </p>
        )}
        <p className="mt-2 text-base font-semibold text-amber-200">
          Debes tener {minAge} años o más para continuar
        </p>
      </div>

      {requireStaff ? (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/15 px-4 py-3">
            <svg className="h-5 w-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="text-sm font-semibold text-amber-200">
              Un empleado verificará tu identificación
            </p>
          </div>
          <Button
            variant="text"
            onClick={onDeny}
            className="text-amber-300 hover:text-amber-200 hover:no-underline"
          >
            Cancelar y quitar producto
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-left">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 h-5 w-5 rounded accent-amber-500"
            />
            <span className="text-sm text-amber-200">
              Confirmo que tengo {minAge} años o más y acepto responsabilidad de esta compra
            </span>
          </label>

          <Button
            variant="warning"
            size="lg"
            block
            onClick={onApprove}
            disabled={!confirmed}
          >
            Confirmar — soy mayor de {minAge} años
          </Button>
          <Button
            variant="ghost"
            block
            onClick={onDeny}
            className="border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
          >
            Cancelar — quitar producto
          </Button>
        </div>
      )}
    </div>
  )
}
