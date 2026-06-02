import { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'

export type SortDir = 'asc' | 'desc' | null

export interface Column<T> {
  key: keyof T | string
  header: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (value: unknown, row: T, index: number) => React.ReactNode
}

export interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey: keyof T | ((row: T) => string)
  loading?: boolean
  emptyMessage?: string
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  onRowClick?: (row: T) => void
  selectedKey?: string | null
  striped?: boolean
  compact?: boolean
  pagination?: boolean
  pageSize?: number
  className?: string
}

export function DataTable<T extends object>({
  columns,
  data,
  rowKey,
  loading = false,
  emptyMessage = 'Sin registros',
  searchable = false,
  searchPlaceholder = 'Buscar…',
  searchKeys,
  onRowClick,
  selectedKey,
  striped = true,
  compact = false,
  pagination = true,
  pageSize = 20,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getKey = useCallback(
    (row: T): string => {
      if (typeof rowKey === 'function') return rowKey(row)
      return String(row[rowKey])
    },
    [rowKey],
  )

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    const keys = searchKeys ?? (columns.map((c) => c.key) as (keyof T)[])
    return data.filter((row) =>
      keys.some((k) => String((row as Record<string, unknown>)[k as string] ?? '').toLowerCase().includes(q)),
    )
  }, [data, search, searchKeys, columns])

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered
    return [...filtered].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey]
      const bv = (b as Record<string, unknown>)[sortKey]
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''), 'es', { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paginated = pagination ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted

  function toggleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else if (sortDir === 'asc') {
      setSortDir('desc')
    } else {
      setSortKey(null)
      setSortDir(null)
    }
    setPage(1)
  }

  function handleSearch(q: string) {
    setSearch(q)
    setPage(1)
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {searchable && (
        <div className="relative">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-caj-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="caj-input pl-9"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/[0.18]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-white/[0.18] bg-white/[0.10]">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className={cn(
                      'px-4 text-left text-xs font-semibold uppercase tracking-wider text-white/60',
                      compact ? 'py-2' : 'py-3',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      col.sortable && 'cursor-pointer hover:text-white select-none',
                      col.width,
                    )}
                    onClick={() => col.sortable && toggleSort(String(col.key))}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {col.sortable && (
                        <span className="text-white/60">
                          {sortKey === String(col.key)
                            ? sortDir === 'asc' ? '↑' : '↓'
                            : '↕'}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.10]">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {columns.map((col) => (
                      <td key={String(col.key)} className={compact ? 'px-4 py-2' : 'px-4 py-3'}>
                        <div className="h-4 animate-pulse rounded bg-white/[0.15]" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-10 text-center text-white/50">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => {
                  const key = getKey(row)
                  return (
                    <tr
                      key={key}
                      onClick={() => onRowClick?.(row)}
                      className={cn(
                        'transition-colors',
                        onRowClick && 'cursor-pointer hover:bg-white/[0.08]',
                        striped && idx % 2 === 1 && 'bg-white/[0.04]',
                        selectedKey === key && 'bg-caj-primary/15',
                      )}
                    >
                      {columns.map((col) => {
                        const rawVal = (row as Record<string, unknown>)[String(col.key)]
                        return (
                          <td
                            key={String(col.key)}
                            className={cn(
                              'px-4 text-sm text-white',
                              compact ? 'py-2' : 'py-3',
                              col.align === 'right' && 'text-right tabular-nums',
                              col.align === 'center' && 'text-center',
                            )}
                          >
                            {col.render ? col.render(rawVal, row, idx) : String(rawVal ?? '')}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} de {sorted.length}
          </span>
          <div className="flex gap-1">
            <PagBtn onClick={() => setPage(1)} disabled={page === 1}>«</PagBtn>
            <PagBtn onClick={() => setPage(p => p - 1)} disabled={page === 1}>‹</PagBtn>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
              return (
                <PagBtn key={p} onClick={() => setPage(p)} active={p === page}>
                  {p}
                </PagBtn>
              )
            })}
            <PagBtn onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>›</PagBtn>
            <PagBtn onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</PagBtn>
          </div>
        </div>
      )}
    </div>
  )
}

function PagBtn({ children, onClick, disabled, active }: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'h-8 min-w-8 rounded-lg px-2 text-sm font-medium transition-colors',
        active
          ? 'bg-caj-primary text-white'
          : 'border border-white/[0.18] bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white',
        disabled && 'pointer-events-none opacity-40',
      )}
    >
      {children}
    </button>
  )
}
