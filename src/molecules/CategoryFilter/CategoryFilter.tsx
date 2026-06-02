import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface Category {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
  color?: string
}

export interface CategoryFilterProps {
  categories: Category[]
  value: string | null
  onChange: (id: string | null) => void
  allLabel?: string
  showAll?: boolean
  variant?: 'tabs' | 'chips' | 'cards'
  className?: string
}

export function CategoryFilter({
  categories,
  value,
  onChange,
  allLabel = 'Todo',
  showAll = true,
  variant = 'chips',
  className,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  function checkScroll() {
    const el = scrollRef.current
    if (!el) return
    setShowLeftArrow(el.scrollLeft > 8)
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    const ro = new ResizeObserver(checkScroll)
    ro.observe(el)
    return () => ro.disconnect()
  }, [categories])

  function scroll(dir: 'left' | 'right') {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' })
  }

  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4', className)}>
        {showAll && (
          <CategoryCard
            id={null}
            label={allLabel}
            selected={value === null}
            onSelect={onChange}
          />
        )}
        {categories.map((c) => (
          <CategoryCard
            key={c.id}
            id={c.id}
            label={c.label}
            icon={c.icon}
            count={c.count}
            color={c.color}
            selected={value === c.id}
            onSelect={onChange}
          />
        ))}
      </div>
    )
  }

  const chipClass = (selected: boolean) =>
    cn(
      'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caj-primary active:scale-95',
      variant === 'tabs'
        ? selected
          ? 'border-b-2 border-caj-primary text-caj-primary rounded-none px-3 py-2'
          : 'border-b-2 border-transparent text-caj-text-muted hover:text-caj-text rounded-none px-3 py-2'
        : selected
        ? 'bg-caj-primary text-white shadow-sm'
        : 'border border-caj-border bg-caj-surface text-caj-text hover:border-caj-primary hover:text-caj-primary',
    )

  return (
    <div className={cn('relative', className)}>
      {showLeftArrow && (
        <button
          type="button"
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-caj-border bg-caj-surface shadow-sm hover:border-caj-primary transition-colors"
          aria-label="Desplazar izquierda"
        >
          ‹
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className={cn(
          'flex gap-2 overflow-x-auto scrollbar-none',
          showLeftArrow && 'pl-9',
          showRightArrow && 'pr-9',
          variant === 'tabs' && 'border-b border-caj-border',
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        role="tablist"
      >
        {showAll && (
          <button
            type="button"
            role="tab"
            aria-selected={value === null}
            onClick={() => onChange(null)}
            className={chipClass(value === null)}
          >
            {allLabel}
          </button>
        )}
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={value === cat.id}
            onClick={() => onChange(cat.id)}
            className={chipClass(value === cat.id)}
          >
            {cat.icon}
            {cat.label}
            {cat.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-xs',
                  value === cat.id
                    ? variant === 'chips' ? 'bg-white/20' : 'text-caj-primary'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-700',
                )}
              >
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {showRightArrow && (
        <button
          type="button"
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border border-caj-border bg-caj-surface shadow-sm hover:border-caj-primary transition-colors"
          aria-label="Desplazar derecha"
        >
          ›
        </button>
      )}
    </div>
  )
}

function CategoryCard({
  id,
  label,
  icon,
  count,
  color,
  selected,
  onSelect,
}: {
  id: string | null
  label: string
  icon?: React.ReactNode
  count?: number
  color?: string
  selected: boolean
  onSelect: (id: string | null) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl border p-3 transition-all active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-caj-primary',
        selected
          ? 'border-caj-primary bg-caj-primary-light shadow-sm'
          : 'border-caj-border bg-caj-surface hover:border-caj-primary',
      )}
    >
      {icon && (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: color ? `${color}20` : undefined }}
        >
          {icon}
        </span>
      )}
      <span className={cn('text-sm font-semibold', selected ? 'text-caj-primary' : 'text-caj-text')}>
        {label}
      </span>
      {count !== undefined && (
        <span className="text-xs text-caj-text-muted">{count} prod.</span>
      )}
    </button>
  )
}
