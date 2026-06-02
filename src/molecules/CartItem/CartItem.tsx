import { cn } from '@/lib/utils'
import { QuantityControl } from '../QuantityControl/QuantityControl'
import { PriceDisplay } from '../../atoms/PriceDisplay/PriceDisplay'

export interface CartItemData {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  sku?: string
  unit?: string
  discount?: number
}

export interface CartItemProps {
  item: CartItemData
  currency?: string
  onRemove?: (id: string) => void
  onQuantityChange?: (id: string, quantity: number) => void
  maxQuantity?: number
  readOnly?: boolean
  className?: string
}

export function CartItem({
  item,
  currency = 'MXN',
  onRemove,
  onQuantityChange,
  maxQuantity = 9999,
  readOnly = false,
  className,
}: CartItemProps) {
  const discountedPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price
  const lineTotal = discountedPrice * item.quantity

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border border-white/[0.18] bg-white/[0.08] backdrop-blur-md p-3',
        className,
      )}
    >
      {/* Image or initials */}
      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-white/[0.10]">
        {item.image ? (
          <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-sm font-bold text-gray-400">
              {item.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{item.name}</p>
        {item.sku && (
          <p className="font-mono text-xs text-white/60">{item.sku}</p>
        )}
        <div className="mt-0.5 flex items-center gap-2">
          {item.discount ? (
            <>
              <PriceDisplay value={item.price} currency={currency} size="xs" variant="muted" strikethrough />
              <PriceDisplay value={discountedPrice} currency={currency} size="xs" variant="positive" />
              <span className="rounded-md bg-red-500/20 border border-red-500/30 px-1 text-xs font-semibold text-red-300">
                -{item.discount}%
              </span>
            </>
          ) : (
            <PriceDisplay value={item.price} currency={currency} size="xs" variant="muted" />
          )}
          {item.unit && (
            <span className="text-xs text-white/60">/ {item.unit}</span>
          )}
        </div>

        {!readOnly && (
          <div className="mt-2">
            <QuantityControl
              value={item.quantity}
              min={1}
              max={maxQuantity}
              onChange={(q: number) => onQuantityChange?.(item.id, q)}
              size="sm"
            />
          </div>
        )}
        {readOnly && (
          <p className="mt-1 text-xs text-white/60">
            Cant: <strong>{item.quantity}</strong>
            {item.unit ? ` ${item.unit}` : ''}
          </p>
        )}
      </div>

      {/* Line total + remove */}
      <div className="flex flex-col items-end gap-2">
        <PriceDisplay value={lineTotal} currency={currency} size="md" variant="highlight" />
        {!readOnly && onRemove && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="rounded-lg p-1 text-white/50 hover:bg-red-500/20 hover:text-red-300 transition-colors"
            aria-label={`Eliminar ${item.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
