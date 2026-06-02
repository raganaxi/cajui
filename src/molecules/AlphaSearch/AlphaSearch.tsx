import { useState, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'
import type { Product } from '@/molecules/ProductCard/ProductCard'
import { ProductCard } from '@/molecules/ProductCard/ProductCard'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')

function normalizeChar(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .trim()
}

function getFirstChar(name: string): string {
  const c = normalizeChar(name)[0]
  if (!c) return '#'
  return /[A-Z]/.test(c) ? c : '#'
}

export interface AlphaSearchProps {
  products: Product[]
  currency?: string
  onAdd: (product: Product) => void
  keyboardShortcut?: string
  className?: string
}

/**
 * Rockola-style alphabetical product browser.
 * Tap a letter → see all products starting with that letter.
 * Used in self-checkout kiosks (estilo Calimax).
 */
export function AlphaSearch({
  products,
  currency = 'MXN',
  onAdd,
  className,
}: AlphaSearchProps) {
  const [activeLetter, setActiveLetter] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const productsPanelRef = useRef<HTMLDivElement>(null)

  const letterMap = useMemo(() => {
    const map: Record<string, Product[]> = {}
    for (const p of products) {
      const ch = getFirstChar(p.name)
      if (!map[ch]) map[ch] = []
      map[ch].push(p)
    }
    return map
  }, [products])

  const availableLetters = new Set(Object.keys(letterMap))

  const displayedProducts = useMemo(() => {
    if (searchQuery.trim()) {
      const q = normalizeChar(searchQuery)
      return products.filter((p) =>
        normalizeChar(p.name).includes(q) ||
        (p.sku && normalizeChar(p.sku).includes(q)),
      )
    }
    if (!activeLetter) return products
    return letterMap[activeLetter] ?? []
  }, [activeLetter, products, letterMap, searchQuery])

  function selectLetter(letter: string) {
    setActiveLetter(letter)
    setSearchQuery('')
    productsPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSearch(q: string) {
    setSearchQuery(q)
    setActiveLetter(null)
  }

  return (
    <div className={cn('flex h-full gap-3', className)}>
      {/* ── Alphabet column (rockola) ── */}
      <div className="caj-glass flex w-14 shrink-0 flex-col overflow-y-auto rounded-2xl">
        {/* "All" button */}
        <button
          type="button"
          onClick={() => { setActiveLetter(null); setSearchQuery('') }}
          className={cn(
            'flex h-10 items-center justify-center text-xs font-bold transition-colors shrink-0',
            !activeLetter && !searchQuery
              ? 'bg-caj-primary text-white'
              : 'text-white/60 hover:bg-white/[0.10]',
          )}
          title="Ver todos"
        >
          ★
        </button>

        {/* Letters */}
        {ALPHABET.map((letter) => {
          const hasProducts = availableLetters.has(letter)
          const isActive = activeLetter === letter
          return (
            <button
              key={letter}
              type="button"
              disabled={!hasProducts}
              onClick={() => hasProducts && selectLetter(letter)}
              className={cn(
                'flex h-9 items-center justify-center text-sm font-bold transition-all shrink-0',
                isActive
                  ? 'bg-caj-primary text-white'
                  : hasProducts
                  ? 'text-white hover:bg-white/[0.10] active:scale-95'
                  : 'cursor-default text-white/20',
              )}
              title={hasProducts ? `Productos: ${letter}` : undefined}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {/* ── Products panel ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Search bar */}
        <div className="relative">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-caj-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por nombre o código…"
            className="caj-input pl-10 text-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveLetter(null) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Section label */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white/60">
            {searchQuery
              ? `Resultados para "${searchQuery}"`
              : activeLetter
              ? `Productos: ${activeLetter}`
              : 'Todos los productos'}
            <span className="ml-2 text-xs">({displayedProducts.length})</span>
          </p>
        </div>

        {/* Product grid */}
        <div
          ref={productsPanelRef}
          className="flex-1 overflow-y-auto"
        >
          {displayedProducts.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center text-white/60">
              <p className="text-2xl">🔍</p>
              <p className="mt-2 text-sm">Sin productos para "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onAdd={onAdd}
                  layout="grid"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
