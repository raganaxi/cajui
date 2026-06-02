import { useState, useMemo } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { GlassPanel } from '@/atoms/GlassPanel'
import { Button } from '@/atoms/Button'
import type { ItemCustomizerProps, ItemSizeOption } from './interface'

const DEFAULT_SIZES: ItemSizeOption[] = [
  { id: 'sm', label: 'Chico', volumeLabel: '12 oz', extraPrice: 0, scale: 0.8 },
  { id: 'md', label: 'Mediano', volumeLabel: '16 oz', extraPrice: 6, scale: 0.95 },
  { id: 'lg', label: 'Grande', volumeLabel: '20 oz', extraPrice: 12, scale: 1.1 },
  { id: 'xl', label: 'Jumbo', volumeLabel: '32 oz', extraPrice: 18, scale: 1.25 },
]

const DEFAULT_MODIFIERS = [
  {
    id: 'sweetness',
    label: 'Nivel de Endulzante',
    type: 'slider' as const,
    sliderLabels: ['Sin Azúcar', 'Ligero', 'Regular', 'Extra Dulce'],
    options: [
      { id: '0', label: 'Sin Azúcar', extraPrice: 0 },
      { id: '1', label: 'Ligero', extraPrice: 0 },
      { id: '2', label: 'Regular', extraPrice: 0, defaultSelected: true },
      { id: '3', label: 'Extra Dulce', extraPrice: 0 },
    ],
  },
  {
    id: 'milk',
    label: 'Tipo de Leche',
    type: 'select' as const,
    options: [
      { id: 'whole', label: 'Leche Entera', extraPrice: 0, defaultSelected: true },
      { id: 'skim', label: 'Leche Deslactosada', extraPrice: 5 },
      { id: 'almond', label: 'Bebida de Almendra', extraPrice: 10 },
      { id: 'oat', label: 'Bebida de Avena', extraPrice: 12 },
    ],
  },
  {
    id: 'extras',
    label: 'Extras & Toppings',
    type: 'checklist' as const,
    options: [
      { id: 'whip', label: 'Crema Batida', extraPrice: 8 },
      { id: 'caramel', label: 'Jarabe de Cajeta/Caramelo', extraPrice: 7 },
      { id: 'shot', label: 'Espresso Shot Extra', extraPrice: 12 },
      { id: 'chips', label: 'Chispas de Chocolate', extraPrice: 6 },
    ],
  },
]

export function ItemCustomizer({
  product,
  sizes = DEFAULT_SIZES,
  modifiers = DEFAULT_MODIFIERS,
  currency = 'MXN',
  locale = 'es-MX',
  onConfirm,
  onCancel,
  className,
}: ItemCustomizerProps) {
  const [selectedSize, setSelectedSize] = useState<ItemSizeOption>(sizes[0])
  const [selections, setSelections] = useState<Record<string, string | string[] | number>>(() => {
    const initial: Record<string, string | string[] | number> = {}
    for (const group of modifiers) {
      if (group.type === 'checklist') {
        initial[group.id] = group.options
          .filter((opt) => opt.defaultSelected)
          .map((opt) => opt.id)
      } else if (group.type === 'slider') {
        const defaultIdx = group.options.findIndex((opt) => opt.defaultSelected)
        initial[group.id] = defaultIdx !== -1 ? defaultIdx : 2
      } else {
        const def = group.options.find((opt) => opt.defaultSelected)
        initial[group.id] = def ? def.id : group.options[0]?.id
      }
    }
    return initial
  })

  const fmt = (v: number) => formatCurrency(v, currency, locale)

  // Calculate total price based on base price, size increment, and selected modifier options
  const totalPrice = useMemo(() => {
    let total = product.price + selectedSize.extraPrice

    for (const group of modifiers) {
      const selection = selections[group.id]
      if (!selection) continue

      if (group.type === 'checklist' && Array.isArray(selection)) {
        for (const optId of selection) {
          const opt = group.options.find((o) => o.id === optId)
          if (opt) total += opt.extraPrice
        }
      } else if (group.type === 'select' && typeof selection === 'string') {
        const opt = group.options.find((o) => o.id === selection)
        if (opt) total += opt.extraPrice
      } else if (group.type === 'slider' && typeof selection === 'number') {
        const opt = group.options[selection]
        if (opt) total += opt.extraPrice
      }
    }
    return total
  }, [product.price, selectedSize, selections, modifiers])

  function handleSelect(groupId: string, optionId: string) {
    setSelections((prev) => ({
      ...prev,
      [groupId]: optionId,
    }))
  }

  function handleChecklistToggle(groupId: string, optionId: string) {
    setSelections((prev) => {
      const current = (prev[groupId] as string[]) || []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return {
        ...prev,
        [groupId]: next,
      }
    })
  }

  function handleSliderChange(groupId: string, index: number) {
    setSelections((prev) => ({
      ...prev,
      [groupId]: index,
    }))
  }

  // Get description of current modifications
  const summaryText = useMemo(() => {
    const list: string[] = [selectedSize.label]
    for (const group of modifiers) {
      const selection = selections[group.id]
      if (group.type === 'checklist' && Array.isArray(selection)) {
        selection.forEach((id) => {
          const label = group.options.find((o) => o.id === id)?.label
          if (label) list.push(label)
        })
      } else if (group.type === 'select' && typeof selection === 'string') {
        const label = group.options.find((o) => o.id === selection)?.label
        if (label) list.push(label)
      } else if (group.type === 'slider' && typeof selection === 'number') {
        const label = group.sliderLabels?.[selection]
        if (label) list.push(label)
      }
    }
    return list.join(' • ')
  }, [selectedSize, selections, modifiers])

  return (
    <GlassPanel
      blur="lg"
      tint="white"
      strength="medium"
      radius="xl"
      className={cn('grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-4xl p-6 text-white overflow-hidden', className)}
    >
      {/* ── LEFT COLUMN: Visual Drink Visualizer (Cafenio-Style) ── */}
      <div className="md:col-span-4 flex flex-col items-center justify-between bg-white/[0.02] rounded-2xl border border-white/5 p-6 min-h-[380px]">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight">{product.name}</h2>
          <p className="text-xs text-white/50 mt-1 line-clamp-2">{product.description || 'Personaliza tu bebida a tu gusto.'}</p>
        </div>

        {/* Scalable Glass Beverage Cup Container */}
        <div className="relative flex items-end justify-center h-48 w-full">
          <div
            className="relative flex flex-col items-center justify-end border-2 border-white/40 rounded-b-[40px] rounded-t-[10px] w-24 h-40 bg-white/[0.04] backdrop-blur-sm [box-shadow:inset_0_4px_12px_rgba(255,255,255,0.15)] transition-all duration-300 origin-bottom"
            style={{ transform: `scale(${selectedSize.scale})` }}
          >
            {/* Ice Cubes inside the cup */}
            <div className="absolute inset-x-2 top-10 bottom-2 overflow-hidden flex flex-wrap gap-1 justify-center items-end opacity-40">
              <div className="w-4 h-4 rounded bg-white/20 border border-white/30 rotate-12" />
              <div className="w-5 h-5 rounded bg-white/20 border border-white/30 -rotate-12" />
              <div className="w-4.5 h-4.5 rounded bg-white/20 border border-white/30 rotate-45" />
            </div>

            {/* Glowing Liquid level */}
            <div
              className={cn(
                'w-full rounded-b-[38px] transition-all duration-500 bg-amber-600/35 border-t border-amber-500/50 [box-shadow:0_0_20px_rgba(245,158,11,0.25)]',
                selectedSize.id === 'sm' ? 'h-[60%]' : selectedSize.id === 'md' ? 'h-[70%]' : selectedSize.id === 'lg' ? 'h-[80%]' : 'h-[85%]'
              )}
            />

            {/* Cup Lip outline */}
            <div className="absolute -top-1 w-[108%] h-2.5 rounded-full border border-white/40 bg-white/10 backdrop-blur-md" />
            
            {/* Straw */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-2 h-20 bg-green-500/40 border border-green-500/50 rounded-full origin-bottom rotate-6 opacity-80" />
          </div>
        </div>

        {/* Badge of selected volume */}
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 border border-white/10">
          {selectedSize.label} ({selectedSize.volumeLabel})
        </span>
      </div>

      {/* ── RIGHT COLUMN: Customizer Controls (Cafenio-Style) ── */}
      <div className="md:col-span-8 flex flex-col justify-between gap-6 overflow-y-auto">
        <div className="space-y-6">
          {/* SECTION 1: Size selector (Visual scale cups) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">Selecciona el tamaño</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={cn(
                    'flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 active:scale-95 cursor-pointer',
                    selectedSize.id === s.id
                      ? 'border-caj-primary/60 bg-caj-primary/10 text-white'
                      : 'border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white'
                  )}
                >
                  {/* Visual representation of cup size */}
                  <div className="h-10 flex items-end justify-center mb-2">
                    <div
                      className={cn(
                        'border rounded-b-lg rounded-t-sm w-5 h-7 transition-all',
                        selectedSize.id === s.id ? 'border-caj-primary bg-caj-primary/20' : 'border-white/40 bg-white/5'
                      )}
                      style={{ height: `${20 + s.scale * 15}px`, width: `${14 + s.scale * 6}px` }}
                    />
                  </div>
                  <span className="text-xs font-bold">{s.label}</span>
                  <span className="text-[10px] text-white/40">{s.volumeLabel}</span>
                  {s.extraPrice > 0 && (
                    <span className="text-[10px] font-semibold text-green-300 mt-0.5">+{fmt(s.extraPrice)}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2: Dynamic Modifier Groups */}
          {modifiers.map((group) => (
            <div key={group.id} className="space-y-3 border-t border-white/5 pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">{group.label}</h3>
              
              {/* === CONTROL TYPE: SLIDER === */}
              {group.type === 'slider' && (
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={group.options.length - 1}
                    value={selections[group.id] as number}
                    onChange={(e) => handleSliderChange(group.id, parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg bg-white/10 appearance-none cursor-pointer accent-caj-primary"
                  />
                  <div className="flex justify-between text-[11px] font-medium text-white/50 px-1">
                    {group.sliderLabels?.map((l, idx) => (
                      <span
                        key={l}
                        className={cn(
                          'cursor-pointer hover:text-white transition-colors',
                          (selections[group.id] as number) === idx && 'text-caj-primary font-bold'
                        )}
                        onClick={() => handleSliderChange(group.id, idx)}
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* === CONTROL TYPE: SELECT (LECHE / ESPRESSO CHIPS) === */}
              {group.type === 'select' && (
                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt) => {
                    const isSelected = selections[group.id] === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect(group.id, opt.id)}
                        className={cn(
                          'px-3 py-2 rounded-xl text-xs font-semibold border transition-all active:scale-95 cursor-pointer',
                          isSelected
                            ? 'border-caj-primary bg-caj-primary/10 text-white'
                            : 'border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white'
                        )}
                      >
                        <span>{opt.label}</span>
                        {opt.extraPrice > 0 && (
                          <span className="ml-1 text-green-300">+{fmt(opt.extraPrice)}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* === CONTROL TYPE: CHECKLIST === */}
              {group.type === 'checklist' && (
                <div className="grid grid-cols-2 gap-2">
                  {group.options.map((opt) => {
                    const isChecked = ((selections[group.id] as string[]) || []).includes(opt.id)
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleChecklistToggle(group.id, opt.id)}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-xl border text-left text-xs font-semibold transition-all active:scale-95 cursor-pointer',
                          isChecked
                            ? 'border-caj-primary bg-caj-primary/10 text-white'
                            : 'border-white/10 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white'
                        )}
                      >
                        <span>{opt.label}</span>
                        <div className="flex items-center gap-2">
                          {opt.extraPrice > 0 && (
                            <span className="text-green-300">+{fmt(opt.extraPrice)}</span>
                          )}
                          <span className={cn(
                            'h-4 w-4 rounded border flex items-center justify-center text-[9px] font-bold transition-all',
                            isChecked ? 'border-caj-primary bg-caj-primary text-white' : 'border-white/20 bg-transparent'
                          )}>
                            {isChecked && '✓'}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── STICKY FOOTER: Summary, Prices & Confirmation ── */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-white/40 uppercase font-semibold">Resumen de receta</span>
            <p className="text-xs text-white/70 italic line-clamp-1">{summaryText}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 font-semibold">Total personalizado</span>
              <span className="text-2xl font-bold text-caj-primary tracking-tight">{fmt(totalPrice)}</span>
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button
                  variant="ghost"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
              )}
              <Button
                variant="primary"
                onClick={() => onConfirm?.({
                  product,
                  size: selectedSize,
                  selections,
                  totalPrice,
                })}
              >
                Agregar a mi Orden
              </Button>
            </div>
          </div>
        </div>
      </div>
    </GlassPanel>
  )
}
