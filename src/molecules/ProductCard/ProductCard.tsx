import { cn } from '@/lib/utils'
import { PriceDisplay } from '../../atoms/PriceDisplay/PriceDisplay'
import { StockBadge } from '../../atoms/StockBadge/StockBadge'

export interface Product {
  id: string
  name: string
  price: number
  sku?: string
  image?: string
  description?: string
  category?: string
  stock?: number
  unit?: string
}

export interface ProductCardProps {
  product: Product
  currency?: string
  layout?: 'grid' | 'list'
  selected?: boolean
  disabled?: boolean
  onAdd?: (product: Product) => void
  className?: string
  lowStockThreshold?: number
}

export function ProductCard({
  product,
  currency = 'MXN',
  layout = 'grid',
  selected = false,
  disabled = false,
  onAdd,
  className,
  lowStockThreshold = 5,
}: ProductCardProps) {
  const isOutOfStock = product.stock !== undefined && product.stock <= 0

  if (layout === 'list') {
    return (
      <button
        type="button"
        onClick={() => !isOutOfStock && onAdd?.(product)}
        disabled={disabled || isOutOfStock}
        className={cn(
          'group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left',
          'backdrop-blur-md transition-all duration-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
          'hover:bg-white/[0.15] hover:border-white/[0.30] active:scale-[0.99]',
          selected
            ? 'border-caj-primary/60 bg-caj-primary/20 [box-shadow:0_0_20px_rgb(var(--caj-primary)/0.2)]'
            : 'border-white/[0.18] bg-white/[0.08]',
          (disabled || isOutOfStock) && 'pointer-events-none opacity-50',
          className,
        )}
      >
        <ProductImage image={product.image} name={product.name} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{product.name}</p>
          {product.sku && (
            <p className="truncate font-mono text-xs text-white/50">{product.sku}</p>
          )}
        </div>
        {product.stock !== undefined && (
          <StockBadge
            quantity={product.stock}
            lowThreshold={lowStockThreshold}
            showCount
          />
        )}
        <PriceDisplay value={product.price} currency={currency} size="lg" variant="highlight" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => !isOutOfStock && onAdd?.(product)}
      disabled={disabled || isOutOfStock}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border text-left',
        'backdrop-blur-md transition-all duration-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        'hover:bg-white/[0.15] hover:border-white/[0.30] active:scale-[0.98]',
        selected
          ? 'border-caj-primary/60 bg-caj-primary/20 [box-shadow:0_0_20px_rgb(var(--caj-primary)/0.2)]'
          : 'border-white/[0.18] bg-white/[0.08]',
        (disabled || isOutOfStock) && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <ProductImage image={product.image} name={product.name} size="lg" />
      <div className="flex flex-col gap-1.5 p-3">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-white">
          {product.name}
        </p>
        {product.sku && (
          <p className="font-mono text-xs text-white/50">{product.sku}</p>
        )}
        <div className="flex items-center justify-between gap-2 mt-1">
          <PriceDisplay value={product.price} currency={currency} size="md" variant="highlight" />
          {product.stock !== undefined && (
            <StockBadge quantity={product.stock} lowThreshold={lowStockThreshold} />
          )}
        </div>
      </div>
    </button>
  )
}

function ProductImage({
  image,
  name,
  size,
}: {
  image?: string
  name: string
  size: 'sm' | 'lg'
}) {
  const cls = size === 'lg'
    ? 'h-32 w-full'
    : 'h-10 w-10 rounded-lg flex-shrink-0'

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={cn(cls, size === 'lg' ? 'object-cover' : 'object-contain rounded-lg')}
      />
    )
  }

  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className={cn(
        cls,
        'flex items-center justify-center bg-white/[0.08]',
        size === 'lg' ? '' : 'rounded-lg',
      )}
      aria-hidden
    >
      <span className="text-lg font-bold text-gray-400 dark:text-gray-500">{initials}</span>
    </div>
  )
}
